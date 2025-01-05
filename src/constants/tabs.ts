import { HomeIcon, LiveIcon, UploadIcon, AnalysisIcon, DocsIcon } from '../components/icons/TabIcons';
import { ChartIcon } from '../components/icons/ChartIcon';

export const BASE_TABS = [
  { id: 'landing', label: 'Overview', icon: HomeIcon },
  { id: 'live', label: 'Live Analysis', icon: LiveIcon },
  { id: 'upload', label: 'Upload', icon: UploadIcon },
  { id: 'monitor', label: 'Token Sentiment Analysis', icon: AnalysisIcon },
  { id: 'chart', label: 'Chart Analysis', icon: ChartIcon },
  { id: 'docs', label: 'Docs', icon: DocsIcon },
];