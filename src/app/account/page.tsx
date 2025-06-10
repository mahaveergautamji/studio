import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';

export const metadata = {
  title: 'My Account - Maths Bridge',
};

export default function AccountPage() {
  return (
    <div className="max-w-xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <UserCircle className="h-16 w-16 mx-auto text-primary mb-4" />
          <CardTitle className="text-3xl font-headline">My Account</CardTitle>
          <CardDescription>Manage your profile and account settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground p-4 bg-yellow-100 border border-yellow-300 text-yellow-700 rounded-md">
            User authentication and profile management are not yet implemented. This is a placeholder page.
          </p>
          
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Demo User" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="demo@example.com" disabled />
          </div>
          
          <div className="space-y-4 pt-4 border-t">
             <h3 className="text-lg font-semibold font-headline">Change Password</h3>
             <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" disabled />
             </div>
             <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" disabled />
             </div>
             <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" disabled />
             </div>
             <Button disabled className="w-full bg-primary hover:bg-primary/80 text-primary-foreground">Update Password</Button>
          </div>

          <Button disabled variant="destructive" className="w-full mt-6">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
