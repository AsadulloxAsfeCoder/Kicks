"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Trash2, Pencil } from "lucide-react";

// --- Schema ---
const CardSchema = z.object({
  cardHolder: z.string().min(1, "Cardholder name is required"),
  cardNumber: z.string().min(16, "Card number must be 16 digits"),
  expiry: z.string().min(5, "Expiry is required"), // Format: MM/YY
  isDefault: z.boolean().optional(),
});

type CardType = z.infer<typeof CardSchema>;

// --- Main Component ---
const SavedCards = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
     watch,
    formState: { errors },
  } = useForm<CardType>({
    resolver: zodResolver(CardSchema),
    defaultValues: {
      cardHolder: "",
      cardNumber: "",
      expiry: "",
      isDefault: false,
    },
  });

  const onSubmit = (data: CardType) => {
    if (data.isDefault) {
      // Reset others
      setCards((prev) =>
        prev.map((card) => ({ ...card, isDefault: false }))
      );
    }

    if (editIndex !== null) {
      // Editing
      const updated = [...cards];
      updated[editIndex] = data;
      setCards(updated);
      setEditIndex(null);
    } else {
      // Adding new card
      setCards([...cards, data]);
    }

    reset();
  };

  const onEdit = (index: number) => {
    const card = cards[index];
    setValue("cardHolder", card.cardHolder);
    setValue("cardNumber", card.cardNumber);
    setValue("expiry", card.expiry);
    setValue("isDefault", card.isDefault || false);
    setEditIndex(index);
  };

  const onDelete = (index: number) => {
    const updated = cards.filter((_, i) => i !== index);
    setCards(updated);
    if (editIndex === index) {
      reset();
      setEditIndex(null);
    }
  };

  const setAsDefault = (index: number) => {
    const updated = cards.map((card, i) => ({
      ...card,
      isDefault: i === index,
    }));
    setCards(updated);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 p-4">
      <h2 className="text-2xl font-semibold">Saved Cards</h2>

      {/* --- Card Form --- */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Cardholder Name</Label>
          <Input {...register("cardHolder")} />
          {errors.cardHolder && (
            <p className="text-red-500 text-sm">{errors.cardHolder.message}</p>
          )}
        </div>

        <div>
          <Label>Card Number</Label>
          <Input {...register("cardNumber")} maxLength={16} />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>
          )}
        </div>

        <div>
          <Label>Expiry (MM/YY)</Label>
          <Input {...register("expiry")} maxLength={5} />
          {errors.expiry && (
            <p className="text-red-500 text-sm">{errors.expiry.message}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Switch
            id="isDefault"
            checked={!!watch("isDefault")}
            onCheckedChange={(checked) => setValue("isDefault", checked)}
          />
          <Label htmlFor="isDefault">Set as default</Label>
        </div>

        <Button type="submit">
          {editIndex !== null ? "Update Card" : "Add Card"}
        </Button>
      </form>

      {/* --- Saved Cards List --- */}
      <div className="space-y-4">
        {cards.map((card, index) => (
          <Card key={index} className="flex justify-between items-center p-4">
            <CardContent className="p-0">
              <div>
                <p className="font-medium">{card.cardHolder}</p>
                <p className="text-muted-foreground">{card.cardNumber}</p>
                <p className="text-sm">{card.expiry}</p>
                {card.isDefault && (
                  <span className="text-green-600 font-semibold text-sm">
                    Default
                  </span>
                )}
              </div>
            </CardContent>

            <div className="flex gap-2">
              {!card.isDefault && (
                <Button
                  variant="outline"
                  onClick={() => setAsDefault(index)}
                  size="sm"
                >
                  Set as Default
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => onEdit(index)}
                size="icon"
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="destructive"
                onClick={() => onDelete(index)}
                size="icon"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavedCards;
