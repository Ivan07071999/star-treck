import { MyButton, MyInput } from '../../index';
import './SearchSection.css';

export const SearchSection = () => {
  return (
    <search className="search-section">
      <div className="search-container">
        <MyInput />
        <MyButton>Find</MyButton>
      </div>
    </search>
  );
};
