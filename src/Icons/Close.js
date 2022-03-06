import React from 'react';

export default function Close({ className }) {
    return (
        <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.9356 11.5215C12.5451 11.131 11.912 11.131 11.5214 11.5215C11.1309 11.9121 11.1309 12.5452 11.5214 12.9358L14.5855 15.9998L11.5213 19.0641C11.1307 19.4546 11.1307 20.0878 11.5213 20.4783C11.9118 20.8688 12.5449 20.8688 12.9355 20.4783L15.9997 17.414L19.0639 20.4782C19.4544 20.8688 20.0876 20.8688 20.4781 20.4782C20.8686 20.0877 20.8686 19.4545 20.4781 19.064L17.4139 15.9998L20.4779 12.9358C20.8685 12.5453 20.8685 11.9121 20.4779 11.5216C20.0874 11.1311 19.4543 11.1311 19.0637 11.5216L15.9997 14.5856L12.9356 11.5215Z" fill="currentColor" />
            <path d="M16 28C9.372 28 4 22.628 4 16C4 9.372 9.372 4 16 4C22.628 4 28 9.372 28 16C28 22.628 22.628 28 16 28Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    );
}
