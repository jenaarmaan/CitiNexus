"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "@/components/icons";
import { handleSuggestTitle, handleClassifyComplaint } from "@/lib/actions";
import type { ClassifyComplaintOutput } from "@/ai/flows/classify-complaint";

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  location: z.string().min(3, { message: "Please provide a valid location." }),
  photo: z.instanceof(File).optional(),
  urgencyLevel: z.enum(["Normal", "Urgent", "Critical"], { required_error: "You need to select an urgency level." }),
});

type FormValues = z.infer<typeof formSchema>;

const fileToDataUri = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
});


export function ComplaintForm() {
  const { toast } = useToast();
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<ClassifyComplaintOutput | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      urgencyLevel: "Normal",
    },
  });

  const onSuggestTitle = async () => {
    const description = form.getValues("description");
    setIsSuggesting(true);
    const result = await handleSuggestTitle({ description });
    setIsSuggesting(false);

    if (result.success && result.data?.title) {
      form.setValue("title", result.data.title, { shouldValidate: true });
      toast({ title: "Title Suggested", description: "AI has suggested a title for you." });
    } else {
      toast({ variant: "destructive", title: "Suggestion Failed", description: result.error });
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    let photoDataUri: string | undefined;
    if (values.photo) {
        try {
            photoDataUri = await fileToDataUri(values.photo);
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'Could not process image file.' });
            setIsSubmitting(false);
            return;
        }
    }
    
    const result = await handleClassifyComplaint({
        ...values,
        photoDataUri,
    });

    setIsSubmitting(false);

    if (result.success && result.data) {
        setSubmissionResult(result.data);
        form.reset();
    } else {
        toast({ variant: "destructive", title: "Submission Failed", description: result.error });
    }
  };

  if (submissionResult) {
    return (
        <Alert variant="default" className="bg-green-50 border-green-200">
            <Icons.check className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800 font-headline">Complaint Submitted Successfully!</AlertTitle>
            <AlertDescription className="text-green-700 space-y-2 mt-2">
                <p>Your complaint has been automatically routed to the correct department.</p>
                <ul className="list-disc pl-5">
                    <li><strong>Assigned Department:</strong> {submissionResult.department}</li>
                    <li><strong>Summary:</strong> {submissionResult.summary}</li>
                    <li><strong>Keywords:</strong> {submissionResult.keywords.join(", ")}</li>
                </ul>
                <Button onClick={() => setSubmissionResult(null)} className="mt-4">
                    Submit Another Complaint
                </Button>
            </AlertDescription>
        </Alert>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the issue in detail. e.g., 'There's a huge pothole in the middle of the road on Elm Street, right in front of the library...'"
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title *</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input placeholder="e.g., 'Large Pothole on Elm Street'" {...field} />
                </FormControl>
                <Button type="button" variant="outline" onClick={onSuggestTitle} disabled={isSuggesting}>
                  {isSuggesting ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Icons.ai className="mr-2 h-4 w-4" />
                  )}
                  Suggest
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Location *</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., '123 Main St, Cityville' or GPS coordinates" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
              control={form.control}
              name="photo"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Optional Photo</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files?.[0])} {...rest} />
                  </FormControl>
                  <FormDescription>A picture can help us understand the issue better.</FormDescription>
                </FormItem>
              )}
            />
        </div>

        <FormField
          control={form.control}
          name="urgencyLevel"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Urgency Level *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl><RadioGroupItem value="Normal" /></FormControl>
                    <FormLabel className="font-normal">Normal</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl><RadioGroupItem value="Urgent" /></FormControl>
                    <FormLabel className="font-normal">Urgent</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl><RadioGroupItem value="Critical" /></FormControl>
                    <FormLabel className="font-normal">Critical</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Complaint'
          )}
        </Button>
      </form>
    </Form>
  );
}
