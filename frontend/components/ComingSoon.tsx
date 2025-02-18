import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Timer } from 'lucide-react';

const ComingSoonPage = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
        }
    };

    return (
        <main className=" flex flex-col items-center justify-center p-4">
            <div className="max-w-2xl mx-auto text-center space-y-8">
                {/* Logo Placeholder */}
                <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center">
                    <Timer className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Main Content */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold ">
                        This Tab is Coming
                    </h1>
                    <p className="text-lg 0">
                        We're working hard to bring you something extraordinary. Stay tuned!
                    </p>
                </div>

                {/* Countdown Timer */}
                <Card className=" border-gray-700">
                    <CardContent className="p-6">
                        <div className="grid grid-cols-4 gap-4">
                            {[
                                { value: '15', label: 'Days' },
                                { value: '10', label: 'Hours' },
                                { value: '24', label: 'Minutes' },
                                { value: '33', label: 'Seconds' }
                            ].map((item) => (
                                <div key={item.label} className="text-center">
                                    <div className="text-2xl md:text-4xl font-bold ">
                                        {item.value}
                                    </div>
                                    <div className="text-sm text-gray-400">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Newsletter Signup */}
                <div className="max-w-md mx-auto">
                    {subscribed ? (
                        <Alert className=" border-green-800">
                            <AlertDescription className="text-green-400">
                                Thanks for subscribing! We'll keep you updated.
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className=" border-gray-700 "
                            />
                            <Button type="submit">
                                Notify Me
                            </Button>
                        </form>
                    )}
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4 mt-8">
                    {['Twitter', 'GitHub', 'LinkedIn'].map((platform) => (
                        <Button
                            key={platform}
                            variant="ghost"
                            className=""
                        >
                            {platform}
                        </Button>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default ComingSoonPage;