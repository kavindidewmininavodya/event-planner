import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function NewEventPage() {
    return (
    <div className="mx-auto w-full max-w-2xl">
        <Card>
            <CardHeader>
                <CardTitle>Create Event</CardTitle>
            </CardHeader>
            <CardContent>
                <Form>
                    <FormField>
                        <Label>Title</Label>
                        <Input 
                            id="title"
                            name="title"
                            required
                            placeholder="Team dinner..."
                        />
                    </FormField>
                    <FormField>
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                            id="description"
                            name="description"
                            placeholder="Optional Location"
                        />
                    </FormField>

                    <FormField>
                        <Label htmlFor="eventDate">Date and time</Label>
                        <Input id="eventDate" name="eventDate" type="datetime-local" />
                        <FormMessage>Optional, you can set this later.</FormMessage>
                    </FormField>

                    <div>
                        <Button> Create event</Button>
                        <Button type="button" variant="outline" asChild>
                            <Link href={"/dashboard"}>
                                Cancel
                            </Link>
                        </Button>
                    </div>
                </Form>

            </CardContent>
        </Card>
    </div>
);
}