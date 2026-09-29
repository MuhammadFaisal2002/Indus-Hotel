import type { Services } from "@/lib/types";

// Photos come from indushotel.com. Extensions are placeholders until the client sends the real numbers.
export const services: Services = {
  reception: { name: "Reception", ext: "0" }, // placeholder, client to confirm

  channels: [
    { number: 1, name: "PTV Home", category: "Entertainment" },
    { number: 2, name: "PTV News", category: "News" },
    { number: 3, name: "Geo News", category: "News" },
    { number: 4, name: "ARY News", category: "News" },
    { number: 5, name: "Dawn News", category: "News" },
    { number: 6, name: "Geo Entertainment", category: "Entertainment" },
    { number: 7, name: "ARY Digital", category: "Entertainment" },
    { number: 8, name: "Hum TV", category: "Entertainment" },
    { number: 9, name: "PTV Sports", category: "Sports" },
    { number: 10, name: "A Sports", category: "Sports" },
    { number: 11, name: "Ten Sports", category: "Sports" },
    { number: 12, name: "Filmazia", category: "Movies" },
    { number: 13, name: "HBO", category: "Movies" },
    { number: 14, name: "Cartoon Network", category: "Kids" },
    { number: 15, name: "Nickelodeon", category: "Kids" },
    { number: 16, name: "Madani Channel", category: "Religious" },
    { number: 17, name: "Quran TV", category: "Religious" },
    { number: 18, name: "8XM", category: "Music" },
    { number: 19, name: "BBC World News", category: "News" },
    { number: 20, name: "Al Jazeera English", category: "News" },
    { number: 21, name: "Discovery", category: "Entertainment" },
  ],

  sections: [
    {
      id: "roomService",
      department: "Room Service",
      label: "Room Service",
      title: "Room Service",
      tagline: "Fresh from our kitchen, served in your room",
      hours: "24 hours",
      photos: [
        { src: "/services/room-service/1.jpg" },
        { src: "/services/room-service/2.jpg" },
        { src: "/services/room-service/3.jpg" },
        { src: "/services/room-service/4.jpg" },
        { src: "/services/room-service/5.jpg" },
      ],
      offers: [
        { name: "In-Room Dining" },
        { name: "Breakfast in Bed" },
        { name: "Pakistani Cuisine" },
        { name: "Chinese & Continental" },
        { name: "Tea, Coffee & Fresh Juices" },
        { name: "Snacks & Desserts" },
      ],
      contact: { name: "Room Service", ext: "11" }, // placeholder, client to confirm
    },
    {
      id: "housekeeping",
      department: "Housekeeping",
      label: "Housekeeping",
      title: "Housekeeping",
      tagline: "Everything you need for a comfortable stay",
      photos: [
        { src: "/services/housekeeping/1.jpg" },
        { src: "/services/housekeeping/2.jpg" },
        { src: "/services/housekeeping/3.jpg" },
        { src: "/services/housekeeping/4.jpg" },
      ],
      offers: [
        { name: "Room Cleaning" },
        { name: "Fresh Towels & Linen" },
        { name: "Extra Pillows & Blankets" },
        { name: "Toiletries Refill" },
        { name: "Laundry & Dry Cleaning" },
        { name: "Pressing Service" },
        { name: "Turndown Service" },
        { name: "Extra Bed" },
      ],
      contact: { name: "Housekeeping", ext: "12" }, // placeholder, client to confirm
    },
    {
      id: "dining",
      department: "Dining",
      label: "Dining",
      title: "Dining",
      tagline: "Pakistani, Chinese & Continental cuisine",
      photos: [
        { src: "/services/dining/1.jpg", caption: "Lazzat Restaurant" },
        { src: "/services/dining/2.jpg", caption: "Lazzat Restaurant" },
        { src: "/services/dining/3.jpg", caption: "Lazzat Restaurant" },
        { src: "/services/dining/4.jpg", caption: "Mocktail Bar" },
        { src: "/services/dining/5.jpg", caption: "Mehfil · Rooftop BBQ" },
      ],
      offers: [
        { name: "Lazzat Restaurant", detail: "Pakistani, Chinese & Continental" },
        { name: "Ziafat Restaurant", detail: "Traditional regional cuisine" },
        { name: "Mehfil", detail: "Rooftop barbeque" },
        { name: "Mocktail Bar", detail: "Non-alcoholic drinks" },
        { name: "Complimentary Breakfast", detail: "Daily, 7:00 – 11:00 AM" },
      ],
      contact: { name: "Lazzat Restaurant", ext: "13" }, // placeholder, client to confirm
    },
    {
      id: "beautyParlor",
      department: "Beauty Parlor",
      label: "Beauty Parlor",
      title: "Indus Beauty Parlor",
      tagline: "Beauty and wellness, inside the hotel",
      note: "For ladies only",
      photos: [{ src: "/services/beauty-parlor/1.jpg" }, { src: "/services/beauty-parlor/2.jpg" }],
      offers: [
        { name: "Skincare & Facials" },
        { name: "Hair Styling" },
        { name: "Bridal Makeup" },
        { name: "Party Makeup" },
        { name: "Mehndi" },
        { name: "Manicure & Pedicure" },
      ],
      contact: { name: "Beauty Parlor", ext: "14" }, // placeholder, client to confirm
    },
  ],
};
