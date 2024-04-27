"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Amenities } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";

const formSchema = z.object({
  roomName: z.string().min(1),
  roomValue: z.coerce
    .number()
    .min(1)
    .refine((value) => !isNaN(value), {
      message: "Số phải là số hợp lệ",
    }),
  bathroomName: z.string().min(1),
  bathroomValue: z.coerce
    .number()
    .min(1)
    .refine((value) => !isNaN(value), {
      message: "Số phải là số hợp lệ",
    }),
});

type AmenitiesFormValues = z.infer<typeof formSchema>;

interface AmenitiesFormProps {
  initialData: Amenities | null;
}

export const AmenitiesForm: React.FC<AmenitiesFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Sửa Tiện Nghi" : "Tạo Mới Tiện Nghi";
  const description = initialData ? "Sửa Tiện Nghi." : "Tạo Mới 1 Tiện Nghi";
  const toastMessage = initialData
    ? "Tiện Nghi được cập nhật."
    : "Tiện Nghi đã được tạo";
  const action = initialData ? "Lưu" : "Tạo";

  const form = useForm<AmenitiesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      roomName: "",
      roomValue: 0,
      bathroomName: "",
      bathroomValue: 0,
    },
  });

  const onSubmit = async (data: AmenitiesFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/amenities/${params.amenitiesId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/amenities`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/amenities`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Đã xảy ra lỗi.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/amenities/${params.amenitiesId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/amenities`);
      toast.success("Tiện Nghi đã được xóa.");
    } catch (error: any) {
      toast.error(
        "Trước tiên, hãy đảm bảo bạn đã xóa tất cả các sản phẩm sử dụng tiện ích này."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="roomName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kiểu phòng ngủ</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="một phòng ngủ...."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kiểu phòng ngủ bằng số</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="1 or 2..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="bathroomName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kiểu phòng vệ sinh</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="một phòng vệ sinh...."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bathroomValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kiểu phòng vệ sinh bằng số</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="1 or 2..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
