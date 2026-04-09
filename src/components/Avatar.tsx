import Image from "next/image";
import { User } from "lucide-react";
import { getStorageUrl } from "@/utils/supabase/storage";

const Avatar = ({ src, name }: { src: string | undefined; name: string | undefined }) => {
    const imageUrl = getStorageUrl('users', src);

    return (
        <div className="rounded-full overflow-hidden relative h-16 w-16">
            {imageUrl ?
                <Image
                    src={imageUrl}
                    alt={name || "Avatar"}
                    fill
                    className="object-cover"
                />
                : <div className="h-16 w-16 bg-primary flex items-center justify-center">
                    <span className="text-white text-xl font-bold">{name ? name?.charAt(0).toUpperCase() : <User className="h-8 w-8" />}</span>
                </div>
            }
        </div>
    )
}

export default Avatar