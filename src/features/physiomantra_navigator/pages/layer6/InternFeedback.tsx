import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PathwayLayout from '@/components/pathway/PathwayLayout';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const InternFeedback = () => {
    const { completePathway } = useProgress();
    const navigate = useNavigate();
    const [rating, setRating] = useState('good');
    const [feedback, setFeedback] = useState('');

    const handleComplete = () => {
        if (!feedback) {
            toast.error('Please provide at least one note of feedback.');
            return;
        }

        const formData = {
            rating,
            feedback,
            sessionType: 'simulation'
        };

        completePathway('layer6', 'internFeedback', null, formData);
        toast.success('Feedback recorded.');
        navigate('/layer6/intern-graduation');
    };

    return (
        <PathwayLayout
            title="Intern Feedback & Review Loop"
            layerNumber={6}
            pathwayNumber={3}
            onComplete={handleComplete}
            completeButtonText="Verify Process"
        >
            <div className="space-y-8">
                <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
                    <p>This is a simulation of the review screen you will see after an intern session.</p>
                </div>

                <div className="border rounded-xl p-6 space-y-6">
                    <div className="space-y-2">
                        <h4 className="font-semibold text-lg">Review Session: Ankit (Ortho Case #42)</h4>
                        <p className="text-sm text-muted-foreground">Intern has submitted the HEP and session summary.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Quick Rating</Label>
                            <RadioGroup value={rating} onValueChange={setRating} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="needs_work" id="r1" />
                                    <Label htmlFor="r1">Needs Work</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="good" id="r2" />
                                    <Label htmlFor="r2">Good</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="excellent" id="r3" />
                                    <Label htmlFor="r3">Excellent</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <Label>One Improvement Note (Mandatory but lightweight)</Label>
                            <Textarea
                                placeholder="e.g. Focus more on eccentrics for this tendinopathy..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </PathwayLayout>
    );
};

export default InternFeedback;
