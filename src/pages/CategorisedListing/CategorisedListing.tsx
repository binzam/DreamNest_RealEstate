import { useParams } from 'react-router-dom';
import { PROPERTIESDATA } from '../../propertiesData';
import { PropertyDataType } from '../../types';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import './CategorisedListing.css';
import BackButton from '../../components/BackButton/BackButton';
const CategorisedListing = () => {
  const { category } = useParams<{ category: string }>();
  const filteredProperties = PROPERTIESDATA.filter(
    (property: PropertyDataType) => property.category === category
  );
  return (
    <div className="listing_page">
      <div className="lising_pge_hdr">
        <BackButton />

        <h2 className="list_ttl">{category}</h2>
        <div className="count_sort">
          <div className="count">{filteredProperties.length} properties</div>
          <div className="sort_by">sort by relevance</div>
        </div>
      </div>
      <div className="listing_pge_content">
        {filteredProperties.map((data: PropertyDataType) => (
          <PropertyCard key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default CategorisedListing;
