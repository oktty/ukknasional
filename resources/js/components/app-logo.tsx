import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <img 
                    src="https://png.pngtree.com/png-vector/20251123/ourmid/pngtree-small-light-brown-bunny-rabbit-sitting-looking-forward-realistic-drawing-clipart-png-image_18039919.webp" 
                    alt="Logo" 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Pengaduan Sarana Sekolah
                </span>
            </div>
        </>
    );
}
