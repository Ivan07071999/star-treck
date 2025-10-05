import { MyButton, MyInput } from '../../index';
import './SearchSection.css';

export const SearchSection = () => {
  return (
    <search className="search__section">
      <MyInput />
      <MyButton>Find</MyButton>
    </search>
  );
};
