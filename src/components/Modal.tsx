import { X } from "lucide-react"

const Modal = ({ isOpen, onClose, children, title }: { isOpen: boolean, onClose: () => void, children: React.ReactNode, title: string }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ display: isOpen ? 'flex' : 'none' }}>
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white md:rounded-lg p-4 md:p-6 w-full h-full md:h-auto md:w-[50vw] flex flex-col">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-xl font-bold">{title}</h1>
                    <button onClick={onClose} className="cursor-pointer"><X /></button>
                </div>
                <div className="flex-1 pt-4 overflow-y-auto md:overflow-visible">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal