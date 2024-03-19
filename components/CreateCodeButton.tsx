"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useConvexAuth } from "convex/react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2),
  language: z.string(),
});

const CreateCodeButton = () => {
  const { isAuthenticated } = useConvexAuth();
  const { mutate, pending } = useApiMutation(api.posts.create);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      language: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (isAuthenticated) {
        const post = await mutate({
          title: values.title,
          language: values.language,
        });
        toast({ title: "Post Created Successfully" });
        router.push(`/post/${post}`);
      } else {
        toast({ variant: "destructive", title: "Sign in to create post" });
      }
    } catch (e: any) {
      toast({ variant: "destructive", title: e.message });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create CodeX</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>CodeX Post</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel className="font-bold">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title for your post" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel className="font-bold">Language</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your prefered language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="javascript">Javascript</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={pending} type="submit">
              {pending ? "Creating..." : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCodeButton;
