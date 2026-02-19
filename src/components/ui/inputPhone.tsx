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
                        <svg className="h-4 w-6 mr-1 opacity-50" viewBox="0 0 24 16">
                            <rect width="24" height="16" fill="#aa151b" />
                            <rect y="4" width="24" height="8" fill="#f1bf00" />
                        </svg>
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
            bg-white/10 border-white/10 text-white placeholder:text-white/30 focus:ring-gold/50 h-12 rounded-xl
            w-full pl-20 pr-3 py-2 border rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            placeholder-gray-400
            disabled:bg-gray-100 disabled:cursor-not-allowed
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