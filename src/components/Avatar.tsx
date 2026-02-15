import { User } from "lucide-react";

const Avatar = ({ src, name }: { src: string | undefined; name: string | undefined }) => {

    return (
        <div className="rounded-full overflow-hidden">
            {src ?
                <img
                    src={src}
                    alt={name}
                    className="h-16 w-16 object-cover"
                />
                : <div className="h-16 w-16 bg-primary flex items-center justify-center">
                    <span className="text-white text-xl font-bold">{name ? name?.charAt(0).toUpperCase() : <User className="h-8 w-8" />}</span>
                </div>
            }
        </div>
    )
}

export default Avatar