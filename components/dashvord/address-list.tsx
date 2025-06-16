"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Home, Plus, MapPin, Pencil, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Manzil formasi schemasi
const addressFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  addressLine1: z.string().min(5, { message: "Address line 1 must be at least 5 characters." }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }),
  zipCode: z.string().min(5, { message: "Zip code must be at least 5 characters." }),
  country: z.string().min(2, { message: "Country must be at least 2 characters." }),
  isDefault: z.boolean(), // faqat boolean, default emas
})


type AddressFormValues = z.infer<typeof addressFormSchema>

// Manzil interfeysi
interface Address {
  id: string
  name: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

// Toast notifikatsiya komponenti
function ToastNotification({
  title,
  description,
  onClose,
  type = "success",
}: {
  title: string
  description: string
  onClose: () => void
  type?: "success" | "error" | "warning"
}) {
  const bgColor = {
    success: "bg-green-100 border-green-400",
    error: "bg-red-100 border-red-400",
    warning: "bg-yellow-100 border-yellow-400",
  }[type]

  const textColor = {
    success: "text-green-800",
    error: "text-red-800",
    warning: "text-yellow-800",
  }[type]

  return (
    <div className={`fixed bottom-4 right-4 z-50 rounded-md border p-4 shadow-lg ${bgColor}`}>
      <div className="flex items-start">
        <div className="flex-1">
          <h3 className={`font-medium ${textColor}`}>{title}</h3>
          <p className={`text-sm ${textColor}`}>{description}</p>
        </div>
        <button onClick={onClose} className="ml-4">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// Dastlabki manzillar ma'lumoti
const initialAddresses: Address[] = [
  {
    id: "addr-1",
    name: "Home",
    addressLine1: "123 Main St",
    addressLine2: "Apt 4B",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    country: "USA",
    isDefault: true,
  },
  {
    id: "addr-2",
    name: "Work",
    addressLine1: "456 Office Blvd",
    addressLine2: "Suite 200",
    city: "Workville",
    state: "NY",
    zipCode: "67890",
    country: "USA",
    isDefault: false,
  },
]

export function AddressList() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null)
  const [toastInfo, setToastInfo] = useState<{
    title: string
    description: string
    type: "success" | "error" | "warning"
    show: boolean
  } | null>(null)

  // Toast ko'rsatish funksiyasi
  const showToast = (title: string, description: string, type: "success" | "error" | "warning" = "success") => {
    setToastInfo({ title, description, type, show: true })
    setTimeout(() => {
      setToastInfo(null)
    }, 5000)
  }

  // Forma konfiguratsiyasi
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      isDefault: false,
    },
  })

  const editForm = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      isDefault: false,
    },
  })

  // Yangi manzil qo'shish
  function onAddSubmit(data: AddressFormValues) {
    const newAddress: Address = {
      id: `addr-${Date.now()}`,
      name: data.name,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2 || "",
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      country: data.country,
      isDefault: data.isDefault,
    }

    // Agar yangi manzil default bo'lsa, boshqalarini o'chirish
    if (data.isDefault) {
      setAddresses(addresses.map(addr => ({ ...addr, isDefault: false })))
    }

    setAddresses([...addresses, newAddress])
    setIsAddDialogOpen(false)
    form.reset()
    showToast("Address added", "Your address has been added successfully.")
  }

  // Manzilni tahrirlash
  function onEditSubmit(data: AddressFormValues) {
    if (!currentAddress) return

    // Agar manzil default bo'lsa, boshqalarini o'chirish
    if (data.isDefault) {
      setAddresses(addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === currentAddress.id
      })))
    }

    setAddresses(addresses.map(addr => 
      addr.id === currentAddress.id
        ? {
            ...addr,
            name: data.name,
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2 || "",
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
            country: data.country,
            isDefault: data.isDefault,
          }
        : addr
    ))

    setIsEditDialogOpen(false)
    editForm.reset()
    showToast("Address updated", "Your address has been updated successfully.")
  }

  // Manzilni o'chirish
  function deleteAddress(id: string) {
    setAddresses(addresses.filter(addr => addr.id !== id))
    showToast("Address deleted", "Your address has been deleted successfully.")
  }

  // Manzilni tahrirlash uchun tayyorlash
  function editAddress(address: Address) {
    setCurrentAddress(address)
    editForm.reset({
      name: address.name,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || "",
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isDefault: address.isDefault,
    })
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      {toastInfo?.show && (
        <ToastNotification
          title={toastInfo.title}
          description={toastInfo.description}
          type={toastInfo.type}
          onClose={() => setToastInfo(null)}
        />
      )}

      <div className="flex justify-end">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
              <DialogDescription>Add a new shipping address to your account.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onAddSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Home, Work, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input placeholder="Street address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 2 (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Apartment, suite, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Zip code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="isDefault"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => field.onChange(value === "true")}
                          defaultValue={field.value ? "true" : "false"}
                          className="flex flex-row space-x-1"
                        >
                          <FormItem className="flex items-center space-x-1 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="true" />
                            </FormControl>
                            <FormLabel className="font-normal">Set as default address</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Save Address</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
            <DialogDescription>Update your shipping address details.</DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Home, Work, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="addressLine1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 1</FormLabel>
                    <FormControl>
                      <Input placeholder="Street address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="addressLine2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 2 (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Apartment, suite, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Zip code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={editForm.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => field.onChange(value === "true")}
                        defaultValue={field.value ? "true" : "false"}
                        className="flex flex-row space-x-1"
                      >
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">Set as default address</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Update Address</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {addresses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <MapPin className="h-10 w-10 text-muted-foreground" />
            <p className="mt-2 text-lg font-medium">No addresses saved</p>
            <p className="text-sm text-muted-foreground">Add shipping addresses to your account.</p>
            <Button className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
              Add Address
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Home className="mr-2 h-4 w-4" />
                    <CardTitle className="text-base">{address.name}</CardTitle>
                  </div>
                  {address.isDefault && (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      Default
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-1 text-sm">
                  <p>{address.addressLine1}</p>
                  {address.addressLine2 && <p>{address.addressLine2}</p>}
                  <p>
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p>{address.country}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => editAddress(address)}>
                  <Pencil className="mr-2 h-3 w-3" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => deleteAddress(address.id)}>
                  <Trash2 className="mr-2 h-3 w-3" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}