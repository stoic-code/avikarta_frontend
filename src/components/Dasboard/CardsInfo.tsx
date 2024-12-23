import React from "react";
import { Card } from "../ui/card";
import { User, UserPlus, Users, ReceiptIndianRupee } from "lucide-react";
import { H2, H3 } from "../typography";

const cardData = [
  { title: "My Clients", total: 52, icon: User },
  { title: "Prospects", total: 34, icon: UserPlus },
  { title: "My Team", total: 27, icon: Users },
  { title: "Sum Assured", total: 43, icon: ReceiptIndianRupee },
  { title: "Total Team Budget", total: 19, icon: ReceiptIndianRupee },
];

export default function CardsInfo() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cardData.map((card, index) => (
            <Card
              key={index}
              className="flex items-center rounded-lg border border-primary p-6 shadow-sm transition duration-300 hover:bg-secondary/20 hover:shadow-md"
            >
              <card.icon className="text-primary" size={44} />
              <div className="ml-6 flex flex-col">
                <H3 className="text-gray-700">{card.title}</H3>
                <H2 className="text-2xl font-semibold text-gray-900">
                  {card.total}
                </H2>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
