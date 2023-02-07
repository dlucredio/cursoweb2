export function MessageBanner({ content, type }) {
    let bannerColorClasses = ''
    if (type === 'warning') {
        bannerColorClasses = 'bg-amber-200 dark:bg-amber-900 dark:text-white';
    } else if (type === 'info') {
        bannerColorClasses = 'bg-green-200 dark:bg-green-900 dark:text-white';
    } else if (type === 'error') {
        bannerColorClasses = 'bg-red-200 dark:bg-red-900 dark:text-white';
    } else {
        throw 'Banner must be either warning, info or error';
    }

    const bannerClasses = bannerColorClasses + ' text-center rounded p-2 w-full max-w-lg text-sm';

    return <div className={bannerClasses}>
        {content}
    </div>;

}
