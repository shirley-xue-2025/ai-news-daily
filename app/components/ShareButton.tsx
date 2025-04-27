import { FC, useState } from 'react';
import { Button } from './ui/button';
import { SlackMessage } from '../services/slackService';

interface ShareButtonProps {
  onShare: () => Promise<SlackMessage>;
  label?: string;
}

const ShareButton: FC<ShareButtonProps> = ({ 
  onShare, 
  label = 'Share to Slack' 
}) => {
  const [isSharing, setIsSharing] = useState(false);
  const [result, setResult] = useState<SlackMessage | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    setResult(null);
    
    try {
      const response = await onShare();
      setResult(response);
      setShowResult(true);
      
      // Auto-hide success message after 3 seconds
      if (response.status === 'success') {
        setTimeout(() => {
          setShowResult(false);
        }, 3000);
      }
    } catch (error) {
      setResult({
        status: 'error',
        message: 'Failed to share. Please try again.'
      });
      setShowResult(true);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="inline-flex flex-col">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleShare}
        disabled={isSharing}
        className="flex items-center gap-1"
      >
        {isSharing ? 'Sharing...' : label}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="ml-1"
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
          <polyline points="16 6 12 2 8 6"></polyline>
          <line x1="12" y1="2" x2="12" y2="15"></line>
        </svg>
      </Button>
      
      {showResult && result && (
        <div 
          className={`text-xs mt-1 p-1 rounded ${
            result.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {result.message}
        </div>
      )}
    </div>
  );
};

export default ShareButton; 