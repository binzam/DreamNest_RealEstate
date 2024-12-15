import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user = {
      firstName: foundUser.firstName,
      id: foundUser._id,
      email: foundUser.email,
      role: foundUser.role,
      profilePicture: foundUser.profilePicture,
    };
    const accessToken = jwt.sign(
      {
        UserInfo: {
          _id: foundUser._id,
          role: foundUser.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    const refreshToken = jwt.sign(
      { _id: foundUser._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: false,
      // secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken, user });
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: error.message });
  }
};
const refresh = (req, res) => {
  const refreshToken = req.cookies.jwt;

  if (!refreshToken) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });

      const foundUser = await User.findOne({
        _id: decoded._id,
      }).exec();

      if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });
      const accessToken = jwt.sign(
        {
          UserInfo: {
            _id: foundUser._id,
            role: foundUser.role,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }
      );
      res.json({ accessToken });
    }
  );
};

const registerUser = async (req, res) => {
  try {
    const { formData } = req.body;
    console.log('fd>>', formData);

    const { firstName, lastName, email, password } = formData;

    if (!email || !password || !firstName || !lastName) {
      throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
      throw Error('Email not valid');
    }
    // if (!validator.isLength(6)) {
    //   throw Error('Password must be atleast 6');
    // }
    const exists = await User.findOne({ email });

    if (exists) {
      throw Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign(
      {
        UserInfo: {
          _id: newUser._id,
          role: newUser.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    const refreshToken = jwt.sign(
      { _id: newUser._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const user = {
      firstName: newUser.firstName,
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
      profilePicture: newUser.profilePicture,
    };
    res.json({ accessToken, user });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({ message: error.message });
  }
};

const logout = (req, res) => {
  const cookies = req.cookies;
  try {
    if (!cookies?.jwt) return res.sendStatus(204);
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'Lax',
      maxAge: 0,
      secure: false,
      // secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({ message: 'Cookie cleared' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred while logging out' });
  }
};

export { registerUser, login, refresh, logout };
