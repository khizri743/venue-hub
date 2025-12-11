import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  // 1. CLEANUP
  try {
    await prisma.review.deleteMany()
    await prisma.booking.deleteMany()
    await prisma.venue.deleteMany()
    await prisma.category.deleteMany()
    await prisma.user.deleteMany()
  } catch (error) {
    console.log("Cleanup skipped.")
  }

  // 2. CREATE CATEGORIES
  const categoriesData = [
    { name: "Weddings", slug: "weddings", image: "https://images.unsplash.com/photo-1519225468359-299651df6250" },
    { name: "Birthdays", slug: "birthdays", image: "https://images.unsplash.com/photo-1530103862676-de3c9a59af38" },
    { name: "Corporate", slug: "corporate", image: "https://images.unsplash.com/photo-1511578314322-379afb476865" },
    { name: "Engagement", slug: "engagement", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8" },
    { name: "Baby Shower", slug: "baby-shower", image: "https://images.unsplash.com/photo-1519819286236-0b5c132227d0" },
    { name: "Concerts", slug: "concerts", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745" },
  ];

  const createdCategories = [];
  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat });
    createdCategories.push(created);
  }

  // 3. CREATE VENDOR
  const vendor = await prisma.user.create({
    data: { email: 'vendor@demo.com', name: 'Grand Hotels Group', role: 'VENDOR' }
  })

  // 4. CREATE CUSTOMERS (Reviewers)
  const sarah = await prisma.user.create({
    data: { 
        email: 'sarah@demo.com', name: 'Sarah Ahmed', role: 'CUSTOMER', 
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200' 
    }
  })
  
  const ali = await prisma.user.create({
    data: { 
        email: 'ali@demo.com', name: 'Ali Khan', role: 'CUSTOMER', 
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200' 
    }
  })

  const ayesha = await prisma.user.create({
    data: { 
        email: 'ayesha@demo.com', name: 'Ayesha Siddiqui', role: 'CUSTOMER', 
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200' 
    }
  })

  // 5. CREATE VENUES
  const venue1 = await prisma.venue.create({
    data: {
        name: "Grand Ballroom Palace", address: "Downtown, Karachi", city: "Karachi", capacity: 500, price: 150000,
        coverImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
        description: "A grand luxury ballroom.",
        vendorId: vendor.id, categoryId: createdCategories[0].id 
    }
  })
  
  const venue2 = await prisma.venue.create({
    data: {
        name: "Sunset Gardens", address: "Clifton, Karachi", city: "Karachi", capacity: 300, price: 120000,
        coverImage: "https://images.unsplash.com/photo-1519225468359-299651df6250",
        description: "Open-air garden.",
        vendorId: vendor.id, categoryId: createdCategories[0].id 
    }
  })

  // 6. CREATE REVIEWS
  await prisma.review.create({
    data: {
        rating: 5,
        comment: "VenueHub made finding our dream wedding venue so easy! The search filters were perfect and we found exactly what we wanted.",
        userId: sarah.id,
        venueId: venue1.id
    }
  })

  await prisma.review.create({
    data: {
        rating: 4,
        comment: "As an event manager, I use VenueHub for all my corporate events. The platform is professional and reliable.",
        userId: ali.id,
        venueId: venue2.id
    }
  })

  await prisma.review.create({
    data: {
        rating: 5,
        comment: "Found the perfect concert venue through VenueHub. The platform made it easy to compare different options.",
        userId: ayesha.id,
        venueId: venue1.id
    }
  })

    await prisma.user.create({
    data: {
        email: 'admin@venuehub.com',
        name: 'Super Admin',
        role: 'ADMIN',
        // In real app, hash this password!
        password: 'adminpassword', 
    }
  })

  console.log('✅ Seeding complete!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })