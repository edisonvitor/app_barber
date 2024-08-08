"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { UseFormReturn } from "react-hook-form/dist";

const SearchItem = () => {
  // Get router instance for navigation purposes
  const router = useRouter();

  // Define form schema using Zod
  const formSchema = z.object({
    search: z.string().trim().min(2, { message: "Digite algo para buscar!" }),
  });

  // Use React Hook Form to manage form state and handle form submission
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  // Handle form submission event
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    router.push(`/barbershop?search=${values.search}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="search"
          render={({ field }: any) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Faça sua busca..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>
          <SearchIcon />
        </Button>
      </form>
    </Form>
  );
};

export default SearchItem;
