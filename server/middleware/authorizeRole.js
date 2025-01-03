const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'You do not have permission to access this resource',
      });
    }
    next();
  };
};

export { authorizeRole };
// usecase
// router.delete('/user/:id', authenticateToken, authorizeRole(['admin']), deleteUser);
