import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Sparkles, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
}
  from "@/components/ui/select";

const formSchema = z.object({
  fullName: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100)
    .regex(/^[a-zA-Z\s]*$/, "Name should only contain letters"),
  age: z.string().min(1, "Please enter your age"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^[0-9]+$/, "Please enter valid digits only"),
  location: z.string().min(2, "Please enter your location"),
  isStudent: z.string(),
  isPhysicallyFit: z.string(),
  comfortableTraveling: z.string(),
  availability: z.string(),
  whyInterested: z.string().min(10, "Please tell us a bit more").max(500),
});

type FormValues = z.infer<typeof formSchema>;

interface ApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ApplicationModal = ({ open, onOpenChange }: ApplicationModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      age: "",
      phone: "",
      location: "",
      isStudent: "",
      isPhysicallyFit: "",
      comfortableTraveling: "",
      availability: "",
      whyInterested: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Application submitted:", data);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset after animation
    setTimeout(() => {
      setIsSubmitted(false);
      form.reset();
    }, 300);
  };

  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md border-0 shadow-2xl bg-card">
          <div className="absolute right-4 top-4 z-20">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center py-12 px-6">
            <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 animate-scale-in">
              <CheckCircle className="w-10 h-10 text-primary" />
              <div className="absolute inset-0 rounded-full bg-primary/5 blur-xl animate-pulse" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">Application Received!</h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Thank you for applying. We'll review your profile and contact you within 24 hours.
            </p>
            <Button onClick={handleClose} size="lg" className="w-full rounded-xl premium-button">
              Return to Home
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto custom-scrollbar p-0 gap-0 border-0 shadow-2xl rounded-2xl">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50 px-6 py-4 flex items-center justify-between">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl font-display font-bold">
              <Sparkles className="w-5 h-5 text-primary" />
              Join the Team
            </DialogTitle>
            <p className="text-sm text-muted-foreground">Fill in your details to get started as a PT Assistant</p>
          </DialogHeader>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full -mr-2" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Personal Details Section */}
              <div className="bg-muted/30 p-5 rounded-xl space-y-4 border border-border/50">
                <h4 className="font-semibold text-sm text-foreground/80 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary rounded-full" /> Personal Details
                </h4>

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Rahul Kumar"
                          className="bg-background"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="21" className="bg-background" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-muted-foreground font-medium border-r border-border pr-2 mr-2">+91</span>
                            <Input
                              placeholder="98765 43210"
                              className="pl-14 bg-background"
                              maxLength={10}
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, '');
                                field.onChange(value);
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Sector 21, Gurgaon" className="bg-background" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Requirements Section */}
              <div className="bg-muted/30 p-5 rounded-xl space-y-5 border border-border/50">
                <h4 className="font-semibold text-sm text-foreground/80 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary rounded-full" /> Requirements
                </h4>

                <FormField
                  control={form.control}
                  name="isStudent"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Are you currently a student?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex gap-4"
                        >
                          <div className="flex-1">
                            <RadioGroupItem value="yes" id="student-yes" className="peer sr-only" />
                            <Label
                              htmlFor="student-yes"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-foreground peer-data-[state=checked]:hover:bg-primary/20 peer-data-[state=checked]:hover:text-foreground cursor-pointer transition-all"
                            >
                              Yes
                            </Label>
                          </div>
                          <div className="flex-1">
                            <RadioGroupItem value="no" id="student-no" className="peer sr-only" />
                            <Label
                              htmlFor="student-no"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-background p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-foreground peer-data-[state=checked]:hover:bg-primary/20 peer-data-[state=checked]:hover:text-foreground cursor-pointer transition-all"
                            >
                              No
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="isPhysicallyFit"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Physically active?</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes, I'm fit</SelectItem>
                              <SelectItem value="no">No, not really</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="comfortableTraveling"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Comfortable traveling?</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes, can travel</SelectItem>
                              <SelectItem value="no">Prefer nearby only</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Work Details */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>When can you work?</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your availability" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="weekdays">Weekdays (Mon-Fri)</SelectItem>
                          <SelectItem value="weekends">Weekends (Sat-Sun)</SelectItem>
                          <SelectItem value="both">Flexible / Both</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whyInterested"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Bio / Experience</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about yourself and why you're a good fit..."
                          className="resize-none min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-2">
                <Button type="submit" className="w-full h-12 text-base font-semibold rounded-xl premium-button shadow-lg shadow-primary/20">
                  Submit Application
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  We respect your privacy. Your details are safe with us.
                </p>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;
