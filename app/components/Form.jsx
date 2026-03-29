'use client';

import { useState } from 'react';
import localFont from 'next/font/local';

<style>
    {`
  input:-webkit-autofill,
  textarea:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    box-shadow: 0 0 0px 1000px transparent inset !important;
    -webkit-text-fill-color: inherit !important;
    caret-color: inherit;
    transition: background-color 9999s ease-in-out 0s;
  }
`}
</style>

const heroFont = localFont({
    src: '../fonts/MyHeroFont.woff2',
    variable: '--font-hero',
});

const italicFont = localFont({
    src: '../fonts/MySelfFont.woff2',
    variable: '--font-italic',
});

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });


    const styles = {
        container: {
            width: '100%',
            maxWidth: '500px',
            margin: '0 auto',
        },

        header: {
            padding: '40px 56px',
            borderBottom: '1px solid #262626',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '32%',
        },

        lets: {
            fontSize: '48px',
            color: 'red',
            width: '100%',
            textAlign: 'left',

        },

        heading: {
            margin: '0',
            fontSize: '32px',
            fontWeight: '500',
            letterSpacing: '-0.04em',
            color: '#222',
            width: '100%',
            textAlign: 'left',
        },

        form: {
            display: 'flex',
            flexDirection: 'column',
        },

        inputBox: {
            borderBottom: '1px solid #262626',
            height: '80px',
        },

        input: {
            width: '100%',
            height: '100%',
            padding: '20px 30px',
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            background: 'transparent',
        },

        buttonWrapper: {
            display: 'flex',
            justifyContent: 'center',
            padding: '40px 0',
        },

        button: {
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'transparent',
            fontSize: '24px',
            cursor: 'pointer',
        },
    };

    const [isHover, setIsHover] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <>
            <style>{`
                input:-webkit-autofill,
                textarea:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
                    box-shadow: 0 0 0px 1000px transparent inset !important;
                    -webkit-text-fill-color: inherit !important;
                    caret-color: inherit;
                    transition: background-color 9999s ease-in-out 0s;
                }
                `}</style>
            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <span className={italicFont.className} style={styles.lets}>
                        Let’s
                    </span>

                    <h1 className={heroFont.className} style={styles.heading}>
                        GET IN TOUCH
                    </h1>
                </div>

                {/* Form */}
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();

                        try {
                            const res = await fetch('/api/contact', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(formData),
                            });

                            const data = await res.json();

                            if (data.success) {
                                setFormData({
                                    name: '',
                                    email: '',
                                    phone: '',
                                    message: '',
                                });
                            } else {
                                alert('Something went wrong');
                            }
                        } catch (err) {
                            console.error(err);
                            alert('Error sending message');
                        }
                    }}
                    style={styles.form}
                >
                    {[
                        { name: 'name', placeholder: 'Name' },
                        { name: 'email', placeholder: 'Email' },
                        { name: 'phone', placeholder: 'Phone' },
                    ].map((field) => (
                        <div key={field.name} style={styles.inputBox}>
                            <input
                                type="text"
                                name={field.name}
                                placeholder={field.placeholder}
                                value={formData[field.name]}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                    ))}

                    {/* Message */}
                    <div style={{ ...styles.inputBox, height: '140px' }}>
                        <textarea
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                            style={{ ...styles.input, resize: 'none', height: '100%' }}
                        />
                    </div>

                    {/* Submit Button */}
                    <div style={styles.buttonWrapper}>
                        <button
                            type="submit"
                            style={styles.button}
                            onMouseEnter={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)}
                        >
                            <img
                                src={isHover ? '/white-arrowButton.svg' : '/arrowButton.svg'}
                                alt="Button"
                            />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}