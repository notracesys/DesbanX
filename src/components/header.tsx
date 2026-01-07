import Link from 'next/link';

const GarenaLogo = () => (
  <svg width="80" height="30" viewBox="0 0 133 47" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M38.013 18.3241C38.013 13.9131 36.8373 10.5193 34.4687 8.15065C32.1001 5.78201 28.7063 4.59769 24.3942 4.59769C20.0821 4.59769 16.6883 5.78201 14.3197 8.15065C11.9511 10.5193 10.7668 13.9131 10.7668 18.3241V28.6759H0V18.3241C0 12.1843 1.83241 7.42777 5.49723 4.05141C9.16205 0.675049 14.3369 0 20.978 0C25.4418 0 29.4184 0.675049 32.8631 2.02515C36.3078 3.37525 39.1118 5.31751 41.2057 7.79155C43.3427 10.2656 44.8219 13.2662 45.578 16.7226H38.013V18.3241Z" fill="white"/>
    <path d="M48 28.6759V4.87714H57.9392V28.6759H48Z" fill="white"/>
    <path d="M96.0028 28.6759V5.72789C96.0028 3.82136 96.3314 2.45788 96.9885 1.63745C97.6456 0.817021 98.6836 0.406809 100.102 0.406809H101.554V7.53587H100.56C100.041 7.53587 99.6433 7.64093 99.3671 7.85102C99.0909 8.06111 98.9528 8.41162 98.9528 8.90255V28.6759H96.0028Z" fill="white"/>
    <path d="M85.2343 4.87714H75.2951V28.6759H85.2343C91.1373 28.6759 95.1481 26.6967 97.242 22.7383C99.3359 18.7799 99.3359 14.9252 97.242 10.9668C95.1481 6.99128 91.1373 4.87714 85.2343 4.87714ZM85.6029 21.8493C86.7267 21.8493 87.6427 21.5742 88.3508 21.024C89.059 20.4738 89.5786 19.6625 89.9071 18.5902C90.2529 17.5178 90.4208 16.3773 90.4208 15.1685C90.4208 13.9598 90.2529 12.8193 89.9071 11.7469C89.5786 10.6746 89.059 10.0468 88.3508 9.8636C87.6427 9.68039 86.7267 9.58878 85.6029 9.58878H82.2607V21.8493H85.6029Z" fill="white"/>
    <path d="M125.044 14.0041L132.072 4.87714H120.323L115.353 11.833V4.87714H105.414V28.6759H115.353V17.9332L123.023 28.6759H133L125.044 17.4749V14.0041Z" fill="white"/>
  </svg>
)

const Logo = () => (
    <Link href="/" className="flex items-center gap-4">
        <GarenaLogo />
        <span className="border-l-2 border-gray-300 h-6"></span>
        <span className="font-headline text-lg font-medium text-gray-200 tracking-tighter">
            Canal Oficial de Recarga
        </span>
    </Link>
);

export default function Header() {
  return (
    <header className="w-full border-b border-white/20 bg-black z-20">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-circle-2 text-gray-300"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>
        </div>
      </div>
    </header>
  );
}
