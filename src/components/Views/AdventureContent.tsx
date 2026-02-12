import { MockDataService } from "@/services/mockData";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getDictionary } from "@/lib/dictionary";

interface AdventureContentProps {
  slug: string;
  lang: string;
}

const AdventureContent = async ({ slug, lang }: AdventureContentProps) => {
  const adventure = await MockDataService.getAdventureBySlug(slug);
  const t = await getDictionary(lang);

  if (!adventure) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64 md:h-96 w-full">
          <Image
            src={adventure.imageUrl}
            alt={adventure.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{adventure.name}</h1>
          <p className="text-gray-600 mb-4">{adventure.description}</p>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
             <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{adventure.difficulty}</span>
             <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">{adventure.duration}</span>
             <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
               ★ {adventure.rating} ({adventure.reviewCount} {t.reviews || 'reviews'})
             </span>
          </div>

          <div className="border-t pt-4 flex justify-between items-center text-[#00382F]">
             <div>
                <span className="text-2xl font-bold">R$ {adventure.price}</span>
                <span className="text-gray-500"> {t.per_person || '/ pessoa'}</span>
             </div>
             <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">
                {t.book_now || 'Reservar Agora'}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdventureContent;

