import { HomeIcon, LiveIcon, UploadIcon, AnalysisIcon, DocsIcon } from '../components/icons/TabIcons';

export const BASE_TABS = [
  { id: 'landing', label: 'Overview', icon: HomeIcon },
  { id: 'live', label: 'Live Analysis', icon: LiveIcon },
  { id: 'upload', label: 'Upload', icon: UploadIcon },
  { id: 'monitor', label: 'Token Sentiment Analysis', icon: AnalysisIcon },
  // Trending tab disabled - can be re-enabled later
  // { id: 'tickers', label: 'Trending', icon: TrendingIcon },
  { id: 'docs', label: 'Docs', icon: DocsIcon },
];

export const SURPRISED_TAB = { 
  id: 'surprised-chat', 
  label: 'Chat', 
  icon: '😮' 
};