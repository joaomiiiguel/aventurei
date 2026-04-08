'use client';

import { useState, ChangeEvent } from 'react';

interface PhoneInputProps {
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    required?: boolean;
    error?: string;
    disabled?: boolean;
    placeholder?: string;
    name?: string;
}

export default function PhoneInput({
    value = '',
    onChange,
    required = false,
    error = '',
    disabled = false,
    placeholder = '666 66 66 66',
    name = 'telefone',
}: PhoneInputProps) {
    const [phoneValue, setPhoneValue] = useState(value);

    const formatSpanishPhone = (valor: string) => {
        // Remove tudo que não é número
        let numbers = valor.replace(/\D/g, '');

        // Remove o prefixo +34 se o usuário digitou
        if (numbers.startsWith('34')) {
            numbers = numbers.substring(2);
        }

        // Limita a 9 dígitos (números espanhóis têm 9 dígitos)
        numbers = numbers.slice(0, 9);

        // Formatação espanhola: XXX XXX XXX ou XXX XX XX XX
        if (numbers.length <= 3) {
            return numbers;
        } else if (numbers.length <= 6) {
            return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
        } else {
            // Formato: 666 66 66 66
            const part1 = numbers.slice(0, 3);
            const part2 = numbers.slice(3, 5);
            const part3 = numbers.slice(5, 7);
            const part4 = numbers.slice(7, 9);

            let formatted = part1;
            if (part2) formatted += ` ${part2}`;
            if (part3) formatted += ` ${part3}`;
            if (part4) formatted += ` ${part4}`;

            return formatted;
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatSpanishPhone(e.target.value);
        setPhoneValue(formattedValue);

        if (onChange) {
            onChange(formattedValue);
        }
    };

    return (
        <div className="mb-4">
            <div className="relative">
                {/* Ícone de telefone com bandeira da Espanha */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <div className="flex items-center gap-2">
                        {/* Bandeira da Espanha */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><mask id="SVGuywqVbel"><circle cx={256} cy={256} r={256} fill="#fff"></circle></mask><g mask="url(#SVGuywqVbel)"><path fill="#ffda44" d="m0 128l256-32l256 32v256l-256 32L0 384Z"></path><path fill="#d80027" d="M0 0h512v128H0zm0 384h512v128H0z"></path><g fill="#eee"><path d="M144 304h-16v-80h16zm128 0h16v-80h-16z"></path><ellipse cx={208} cy={296} rx={48} ry={32}></ellipse></g><g fill="#d80027"><rect width={16} height={24} x={128} y={192} rx={8}></rect><rect width={16} height={24} x={272} y={192} rx={8}></rect><path d="M208 272v24a24 24 0 0 0 24 24a24 24 0 0 0 24-24v-24h-24z"></path></g><rect width={32} height={16} x={120} y={208} fill="#ff9811" ry={8}></rect><rect width={32} height={16} x={264} y={208} fill="#ff9811" ry={8}></rect><rect width={32} height={16} x={120} y={304} fill="#ff9811" rx={8}></rect><rect width={32} height={16} x={264} y={304} fill="#ff9811" rx={8}></rect><path fill="#ff9811" d="M160 272v24c0 8 4 14 9 19l5-6l5 10a21 21 0 0 0 10 0l5-10l5 6c6-5 9-11 9-19v-24h-9l-5 8l-5-8h-10l-5 8l-5-8z"></path><path fill="#d80027" d="M122 248a4 4 0 0 0-4 4a4 4 0 0 0 4 4h172a4 4 0 0 0 4-4a4 4 0 0 0-4-4zm0 24a4 4 0 0 0-4 4a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4a4 4 0 0 0-4-4zm144 0a4 4 0 0 0-4 4a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4a4 4 0 0 0-4-4z"></path><path fill="#eee" d="M196 168c-7 0-13 5-15 11l-5-1c-9 0-16 7-16 16s7 16 16 16c7 0 13-4 15-11a16 16 0 0 0 17-4a16 16 0 0 0 17 4a16 16 0 1 0 10-20a16 16 0 0 0-27-5q-4.5-6-12-6m0 8c5 0 8 4 8 8c0 5-3 8-8 8c-4 0-8-3-8-8c0-4 4-8 8-8m24 0c5 0 8 4 8 8c0 5-3 8-8 8c-4 0-8-3-8-8c0-4 4-8 8-8m-44 10l4 1l4 8c0 4-4 7-8 7s-8-3-8-8c0-4 4-8 8-8m64 0c5 0 8 4 8 8c0 5-3 8-8 8c-4 0-8-3-8-7l4-8z"></path><path fill="none" d="M220 284v12c0 7 5 12 12 12s12-5 12-12v-12z"></path><path fill="#ff9811" d="M200 160h16v32h-16z"></path><path fill="#eee" d="M208 224h48v48h-48z"></path><path fill="#d80027" d="m248 208l-8 8h-64l-8-8c0-13 18-24 40-24s40 11 40 24m-88 16h48v48h-48z"></path><rect width={20} height={32} x={222} y={232} fill="#d80027" rx={10} ry={10}></rect><path fill="#ff9811" d="M168 232v8h8v16h-8v8h32v-8h-8v-16h8v-8zm8-16h64v8h-64z"></path><g fill="#ffda44"><circle cx={186} cy={202} r={6}></circle><circle cx={208} cy={202} r={6}></circle><circle cx={230} cy={202} r={6}></circle></g><path fill="#d80027" d="M169 272v43a24 24 0 0 0 10 4v-47zm20 0v47a24 24 0 0 0 10-4v-43z"></path><g fill="#338af3"><circle cx={208} cy={272} r={16}></circle><rect width={32} height={16} x={264} y={320} ry={8}></rect><rect width={32} height={16} x={120} y={320} ry={8}></rect></g></g></svg>
                        <span className="text-gray-500 text-sm">+34</span>
                    </div>
                </div>

                <input
                    type="tel"
                    id={name}
                    name={name}
                    required={required}
                    value={phoneValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    maxLength={14} // 9 números + 4 espaços = 13-14 caracteres
                    className={`
            w-full pl-20 pr-3 py-2 border border-gray-300 bg-background rounded-md px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
            ${error
                            ? 'border-red-500 text-red-900 focus:ring-red-500'
                            : 'border-gray-300 text-gray-900'
                        }
          `}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${name}-error` : undefined}
                />
            </div>

            {/* Mensagem de erro */}
            {error && (
                <p
                    id={`${name}-error`}
                    className="mt-1 text-sm text-red-600"
                >
                    {error}
                </p>
            )}
        </div>
    );
}