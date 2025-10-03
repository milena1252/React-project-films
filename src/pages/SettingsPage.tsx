import { clearFavorites } from '../store/favoritesSlice';
import { setShowRatings } from '../store/settingsSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import './SettingsPage.css';
import { GrFavorite } from 'react-icons/gr';
import { FiInfo, FiMonitor, FiTrash2 } from 'react-icons/fi';

export const SettingsPage = () => {
    const dispatch = useAppDispatch();
    const favoritesCount = useAppSelector(state => state.favorites.movies.length);
    const showRatings = useAppSelector(state => state.settings.showRating);

    return (
    <div className='settings-page'>
        <h1 className='settings-title'>Settings</h1>

        {/* Секция избранного */}
        <div className='settings-section'>
            <div className="section-header">
                <GrFavorite className="section-icon" />
                <h3>Favorites</h3>
            </div>
    
        <div className="favorites-stats">
            <div className="stat-badge">
                <span className="stat-number">{favoritesCount}</span>
            <span className="stat-label">{favoritesCount === 1 ? 'Movie' : 'Movies'}</span>
            </div>
      
            <button
                className='danger-btn'
                disabled={favoritesCount === 0}
                onClick={() => {
                    if (confirm('Are you sure you want to clear all favorites?')) {
                    dispatch(clearFavorites())
                }
            }}
            >
            <FiTrash2 className="btn-icon" />
            Clear All
            </button>
        </div>
    </div>

    {/* Настройки отображения */}
    <div className='settings-section'>
        <div className="section-header">
        <FiMonitor className="section-icon" />
        <h3>Display Options</h3>
        </div>
        
        <div className="toggle-option">
        <label className='settings-option'>
            <div className="toggle-switch">
            <input 
                type="checkbox"
                checked={showRatings}
                onChange={(e) => dispatch(setShowRatings(e.target.checked))}
            />
            <span className="slider"></span>
            </div>
            <span className="option-title">Show IMDb Ratings</span>
        </label>
        </div>
    </div>

    {/* Информация о приложении */}
    <div className="settings-section">
        <div className="section-header">
        <FiInfo className="section-icon" />
        <h3>About</h3>
        </div>
        
        <div className="about-content">
            <span className="about-label">Version</span>
            <span className="about-value">1.0.0</span>
            <span className="about-label">Copyright</span>
            <span className="about-value">© {new Date().getFullYear()} Movie App</span>
        </div>
    </div>
    </div>
    )
}