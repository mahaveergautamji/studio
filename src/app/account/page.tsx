"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { UserCircle, LogIn, KeyRound, ShieldAlert } from 'lucide-react'; 

// Mock social providers for UI
const socialProviders = [
  { name: 'Google', icon: <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12.5C5,8.75 8.36,5.73 12.19,5.73C15.19,5.73 17.5,6.7 17.5,6.7L19.43,4.82C19.43,4.82 16.58,2.35 12.19,2.35C6.42,2.35 2.5,6.92 2.5,12.5C2.5,18.08 6.42,22.65 12.19,22.65C17.6,22.65 21.58,18.33 21.58,12.88C21.58,12.23 21.48,11.66 21.35,11.1V11.1Z" /></svg> },
  { name: 'GitHub', icon: <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21V19.21C6.73,19.64 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.83,16.41C14.17,16.72 14.5,17.33 14.5,18.26V21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" /></svg> },
];

export default function AccountPage() {
  // Mock handlers for form submissions
  const handleProfileUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Profile update submitted (Placeholder - No backend integration)');
  };

  const handlePasswordChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Password change submitted (Placeholder - No backend integration)');
  };

  const handleSocialSignIn = (providerName: string) => {
    alert(`Sign in with ${providerName} clicked (Placeholder - No backend integration)`);
  };
  
  const handleDeleteAccount = () => {
    alert('Delete account clicked (Placeholder - No backend integration)');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <UserCircle className="h-16 w-16 mx-auto text-primary mb-4" />
          <CardTitle className="text-3xl font-headline">My Account</CardTitle>
          <CardDescription>Manage your profile, password, and linked accounts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <fieldset>
              <legend className="text-xl font-semibold font-headline mb-3 text-primary">Profile Information</legend>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Demo User" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="demo@example.com" />
                </div>
                <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground">Save Profile Changes</Button>
              </div>
            </fieldset>
          </form>
          
          <hr className="border-border" />

          <form onSubmit={handlePasswordChange} className="space-y-6">
            <fieldset>
              <legend className="text-xl font-semibold font-headline mb-3 text-primary flex items-center">
                <KeyRound className="mr-2 h-5 w-5" /> Change Password
              </legend>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" placeholder="Enter your current password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                </div>
                <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground">Update Password</Button>
              </div>
            </fieldset>
          </form>

          <hr className="border-border" />

          <div className="space-y-6">
            <h3 className="text-xl font-semibold font-headline text-primary flex items-center">
              <LogIn className="mr-2 h-5 w-5" /> Linked Accounts
            </h3>
            <p className="text-sm text-muted-foreground">
              Connect your social media accounts for faster login. (UI Placeholder - Backend not implemented)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialProviders.map((provider) => (
                <Button 
                  key={provider.name} 
                  variant="outline" 
                  className="w-full justify-center py-2 text-sm sm:py-3 sm:text-base"
                  onClick={() => handleSocialSignIn(provider.name)}
                >
                  {provider.icon}
                  Sign in with {provider.name}
                </Button>
              ))}
            </div>
          </div>
          
          <hr className="border-border" />

          <div className="space-y-4">
            <h3 className="text-xl font-semibold font-headline text-destructive flex items-center">
              <ShieldAlert className="mr-2 h-5 w-5" /> Account Management
            </h3>
            <Button 
              variant="destructive" 
              className="w-full sm:w-auto"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
            <p className="text-xs text-muted-foreground">
              Account deletion is permanent and cannot be undone. (UI Placeholder)
            </p>
          </div>
          
          <div className="mt-6 p-4 bg-muted/30 rounded-md border border-border">
            <p className="text-sm text-center text-muted-foreground">
              Please note: Full user authentication, social logins, and backend data storage are not yet implemented. This page provides UI placeholders for these features.
            </p>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
