    "use client";

    import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    } from "@/components/ui/breadcrumb";
    import { usePathname } from "next/navigation";
    import React from "react";

    // Breadcrumblarni generatsiya qiluvchi funksiya
    function generateBreadcrumbs(pathname: string): { label: string; to: string }[] {
    const pathParts = pathname.split("/").filter(Boolean);
    return pathParts.map((value, index) => {
        const to = `/${pathParts.slice(0, index + 1).join("/")}`;
        return { label: decodeURIComponent(value), to };
    });
    }

    function ProductBreadcrumb() {
    const pathname = usePathname();
    const breadcrumbs = generateBreadcrumbs(pathname);

    return (
        <Breadcrumb className="mb-5">
        <BreadcrumbList>
            <BreadcrumbItem>
            <BreadcrumbLink className="text-base" href="/"></BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={breadcrumb.to}>
                <BreadcrumbItem>
                {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                ) : (
                    <BreadcrumbLink href={breadcrumb.to}>{breadcrumb.label}</BreadcrumbLink>
                )}
                </BreadcrumbItem>
                {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
            ))}
        </BreadcrumbList>
        </Breadcrumb>
    );
    }

    export default ProductBreadcrumb;
