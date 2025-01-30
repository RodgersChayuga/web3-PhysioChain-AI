'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const Settings = () => {
    const [notifications, setNotifications] = useState(true);
    const [dataSharing, setDataSharing] = useState(false);
    const [theme, setTheme] = useState('light');

    return (
        <div className="container mx-auto p-4 space-y-6">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span>Enable Notifications</span>
                            <input
                                type="checkbox"
                                checked={notifications}
                                onChange={(e) => setNotifications(e.target.checked)}
                                className="toggle"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <span>Data Sharing</span>
                            <input
                                type="checkbox"
                                checked={dataSharing}
                                onChange={(e) => setDataSharing(e.target.checked)}
                                className="toggle"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <span>Theme</span>
                            <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                className="select select-bordered"
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}