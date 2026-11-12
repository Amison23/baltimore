import Image from "next/image";
import Link from "next/link";
import { getMenuNodeHref, type MenuNode } from "@/lib/nav";

type MegaPanelProps = {
  node: MenuNode;
  onNavigate: () => void;
};

function NodeLink({ node, onNavigate, className = "" }: { node: MenuNode; onNavigate: () => void; className?: string }) {
  const href = getMenuNodeHref(node);
  if (node.disabled || !href) {
    return <span aria-disabled={node.disabled ? "true" : undefined} className={`${className} ${node.disabled ? "cursor-not-allowed text-brand-slate-light" : "text-brand-ink"}`}>{node.label}{node.disabled && <span className="ml-2 text-xs">Coming soon</span>}</span>;
  }

  return <Link href={href} onClick={onNavigate} className={`${className} text-brand-ink transition-colors hover:text-brand-gold motion-reduce:transition-none`}>{node.label}</Link>;
}

export function MegaPanel({ node, onNavigate }: MegaPanelProps) {
  return (
    <div className="absolute inset-x-0 top-full z-40 border-t border-brand-border-strong bg-white shadow-lg transition duration-150 ease-out motion-reduce:transition-none">
      <div className="mx-auto flex max-h-[calc(100dvh-var(--header-h)-3rem)] max-w-[1180px] gap-8 overflow-y-auto px-5 py-8 sm:px-8 lg:px-10">
        <div className="grid min-w-0 flex-1 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8">
          {(node.children ?? []).map((column) => (
            <div key={column.label}>
              <NodeLink node={column} onNavigate={onNavigate} className="text-sm font-semibold" />
              <ul className={`mt-4 space-y-3 ${column.children && column.children.length > 8 ? "lg:columns-2 lg:space-y-0" : ""}`}>
                {(column.children ?? []).map((link) => (
                  <li key={link.label} className={column.children && column.children.length > 8 ? "mb-3 break-inside-avoid" : ""}>
                    <NodeLink node={link} onNavigate={onNavigate} className="block text-sm" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {node.feature && (
          <Link href={node.feature.href ?? "#"} onClick={onNavigate} className="hidden w-[320px] shrink-0 overflow-hidden rounded-xl lg:block">
            <Image src={node.feature.src} alt={node.feature.alt} width={320} height={220} className="h-auto w-full" />
          </Link>
        )}
      </div>
    </div>
  );
}
