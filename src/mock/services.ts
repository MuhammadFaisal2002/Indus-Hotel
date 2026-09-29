import type { Services } from "@/lib/types";

export const services: Services = {
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

  roomService: [
    { id: "rs-tea", name: "Doodh Patti Chai", description: "Pot for two", price: 450 }, // placeholder, client to confirm
    { id: "rs-coffee", name: "Fresh Coffee", description: "Americano or cappuccino", price: 650 }, // placeholder, client to confirm
    { id: "rs-club", name: "Club Sandwich", description: "With fries", price: 1400 }, // placeholder, client to confirm
    { id: "rs-burger", name: "Beef Burger", description: "With fries and coleslaw", price: 1650 }, // placeholder, client to confirm
    { id: "rs-biryani", name: "Chicken Biryani", description: "With raita and salad", price: 1500 }, // placeholder, client to confirm
    { id: "rs-karahi", name: "Chicken Karahi (Half)", description: "With 2 naan", price: 2200 }, // placeholder, client to confirm
    { id: "rs-fruit", name: "Seasonal Fruit Platter", price: 900 }, // placeholder, client to confirm
    { id: "rs-juice", name: "Fresh Juice", description: "Orange or mango", price: 600 }, // placeholder, client to confirm
    { id: "rs-water", name: "Mineral Water (1.5 L)", price: 180 }, // placeholder, client to confirm
    { id: "rs-dessert", name: "Gulab Jamun", description: "Two pieces, warm", price: 450 }, // placeholder, client to confirm
  ],

  housekeeping: [
    { id: "hk-clean", name: "Room Cleaning", description: "Full clean of your room", price: 0 },
    { id: "hk-towels", name: "Extra Towels", price: 0 },
    { id: "hk-pillows", name: "Extra Pillows", price: 0 },
    { id: "hk-blanket", name: "Extra Blanket", price: 0 },
    { id: "hk-toiletries", name: "Toiletries Refill", price: 0 },
    { id: "hk-turndown", name: "Turndown Service", price: 0 },
    { id: "hk-laundry", name: "Laundry (per piece)", description: "Returned within 24 hours", price: 250 }, // placeholder, client to confirm
    { id: "hk-press", name: "Ironing (per piece)", price: 150 }, // placeholder, client to confirm
    { id: "hk-dryclean", name: "Dry Cleaning (per piece)", price: 600 }, // placeholder, client to confirm
    { id: "hk-extrabed", name: "Extra Bed", description: "Per night", price: 2500 }, // placeholder, client to confirm
  ],

  dining: {
    name: "Lazzat Restaurant",
    timings: [
      { label: "Breakfast", hours: "7:00 – 10:30 AM" }, // placeholder, client to confirm
      { label: "Lunch", hours: "12:30 – 3:30 PM" }, // placeholder, client to confirm
      { label: "Dinner", hours: "7:30 – 11:30 PM" }, // placeholder, client to confirm
    ],
    categories: [
      {
        id: "breakfast",
        name: "Breakfast",
        items: [
          { id: "d-halwa", name: "Halwa Puri", description: "With chana and aloo", price: 950 }, // placeholder, client to confirm
          { id: "d-paratha", name: "Aloo Paratha", description: "With yogurt and pickle", price: 650 }, // placeholder, client to confirm
          { id: "d-omelette", name: "Masala Omelette", description: "With toast", price: 600 }, // placeholder, client to confirm
          { id: "d-english", name: "English Breakfast", description: "Eggs, sausage, beans, toast", price: 1500 }, // placeholder, client to confirm
          { id: "d-pancakes", name: "Pancakes", description: "With honey and butter", price: 850 }, // placeholder, client to confirm
        ],
      },
      {
        id: "desi",
        name: "Desi",
        items: [
          { id: "d-karahi", name: "Chicken Karahi (Full)", price: 3800 }, // placeholder, client to confirm
          { id: "d-mutton", name: "Mutton Karahi (Half)", price: 3400 }, // placeholder, client to confirm
          { id: "d-nihari", name: "Beef Nihari", price: 1800 }, // placeholder, client to confirm
          { id: "d-haleem", name: "Haleem", price: 1200 }, // placeholder, client to confirm
          { id: "d-daal", name: "Daal Makhni", price: 950 }, // placeholder, client to confirm
          { id: "d-palla", name: "Sindhi Palla Fish", description: "Seasonal", price: 2800 }, // placeholder, client to confirm
        ],
      },
      {
        id: "continental",
        name: "Continental",
        items: [
          { id: "d-steak", name: "Pepper Steak", description: "With mash and vegetables", price: 3200 }, // placeholder, client to confirm
          { id: "d-alfredo", name: "Chicken Alfredo Pasta", price: 1900 }, // placeholder, client to confirm
          { id: "d-grilled", name: "Grilled Chicken", description: "Mushroom sauce", price: 2100 }, // placeholder, client to confirm
          { id: "d-fishchips", name: "Fish & Chips", price: 2300 }, // placeholder, client to confirm
          { id: "d-caesar", name: "Caesar Salad", price: 1100 }, // placeholder, client to confirm
        ],
      },
      {
        id: "bbq",
        name: "BBQ",
        items: [
          { id: "d-tikka", name: "Chicken Tikka", description: "Leg or chest", price: 950 }, // placeholder, client to confirm
          { id: "d-seekh", name: "Beef Seekh Kabab", description: "4 pieces", price: 1200 }, // placeholder, client to confirm
          { id: "d-malai", name: "Malai Boti", price: 1400 }, // placeholder, client to confirm
          { id: "d-chops", name: "Mutton Chops", price: 2900 }, // placeholder, client to confirm
          { id: "d-platter", name: "BBQ Platter for Two", price: 4500 }, // placeholder, client to confirm
        ],
      },
      {
        id: "drinks",
        name: "Drinks",
        items: [
          { id: "d-lassi", name: "Lassi", description: "Sweet or salted", price: 450 }, // placeholder, client to confirm
          { id: "d-mint", name: "Mint Margarita", price: 550 }, // placeholder, client to confirm
          { id: "d-soft", name: "Soft Drink", price: 250 }, // placeholder, client to confirm
          { id: "d-kashmiri", name: "Kashmiri Chai", price: 500 }, // placeholder, client to confirm
          { id: "d-greentea", name: "Green Tea", price: 300 }, // placeholder, client to confirm
        ],
      },
    ],
  },

  spa: {
    name: "Indus Beauty Parlor",
    note: "For ladies only",
    hours: "11:00 AM – 9:00 PM", // placeholder, client to confirm
    services: [
      { id: "sp-facial", name: "Signature Facial", durationMin: 60, price: 4500 }, // placeholder, client to confirm
      { id: "sp-mani", name: "Manicure", durationMin: 45, price: 2000 }, // placeholder, client to confirm
      { id: "sp-pedi", name: "Pedicure", durationMin: 45, price: 2500 }, // placeholder, client to confirm
      { id: "sp-hair", name: "Hair Cut & Blow Dry", durationMin: 60, price: 3500 }, // placeholder, client to confirm
      { id: "sp-mehndi", name: "Mehndi (both hands)", durationMin: 60, price: 3000 }, // placeholder, client to confirm
      { id: "sp-makeup", name: "Party Makeup", durationMin: 90, price: 8000 }, // placeholder, client to confirm
      { id: "sp-wax", name: "Full Arms Waxing", durationMin: 30, price: 1500 }, // placeholder, client to confirm
      { id: "sp-massage", name: "Head & Shoulder Massage", durationMin: 30, price: 2200 }, // placeholder, client to confirm
    ],
  },

  frontDesk: {
    extensions: [
      { name: "Reception", ext: "0" }, // placeholder, client to confirm
      { name: "Room Service", ext: "11" }, // placeholder, client to confirm
      { name: "Housekeeping", ext: "12" }, // placeholder, client to confirm
      { name: "Lazzat Restaurant", ext: "13" }, // placeholder, client to confirm
      { name: "Beauty Parlor", ext: "14" }, // placeholder, client to confirm
      { name: "Security", ext: "19" }, // placeholder, client to confirm
    ],
    checkInTime: "2:00 PM", // placeholder, client to confirm
    checkOutTime: "12:00 PM", // placeholder, client to confirm
    amenities: ["Fitness Gym", "Event Spaces & Conference Halls", "24/7 Security", "Complimentary Wi-Fi"],
  },
};
