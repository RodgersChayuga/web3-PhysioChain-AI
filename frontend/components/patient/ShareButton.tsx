import React from 'react';
import { Button } from "../ui/button";
import { Share2 } from "lucide-react";

interface ShareButtonProps {
    achievement: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ achievement }) => {
    const handleShare = () => {
        const shareText = `I just achieved "${achievement}" on PhysioChain AI! #PhysioChainAI`;
        if (navigator.share) {
            navigator.share({
                title: "My Achievement",
                text: shareText,
                url: window.location.href,
            });
        } else {
            alert("Sharing is not supported on this device.");
        }
    };

    return (
        <Button variant="outline" onClick={handleShare} className="text-blue-500 hover:underline">
            <Share2 />
        </Button>
    );
};