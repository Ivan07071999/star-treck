import './SelectedItemsBar.css';
import { clearItems } from '../store/reducers/SelectedItemsSlice';
import { MyButton } from '../index';
import { useAppDispatch, useAppSelector } from '../index';

export const SelectedItemsBar = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.selectedItemsReducer);

  const handleClearAll = () => {
    dispatch(clearItems());
  };

  const handleDownload = () => {
    if (items.length === 0) return;

    const headers = ['Title', 'Series', 'Season Number', 'Episodes', 'URL'];
    const csvContent = [
      headers.join(','),
      ...items.map((item) =>
        [
          `"${item.title}"`,
          `"${item.seriesTitle}"`,
          item.seasonNumber,
          item.numberOfEpisodes || 'N/A',
          `"${item.url}"`,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${items.length}_items.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (items.length === 0) return null;

  return (
    <div className="selected-items-bar">
      <div className="selected-info">
        Selected: {items.length} {items.length === 1 ? 'item' : 'items'}
      </div>
      <div className="selected-actions">
        <MyButton onClick={handleClearAll} className="clear-btn">
          Clear All
        </MyButton>
        <MyButton onClick={handleDownload} className="download-btn">
          Download
        </MyButton>
      </div>
    </div>
  );
};
