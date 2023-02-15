/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{js,jsx,html}'
    // './src/**/*.js',
    // './src/**/*.jsx',
    // './public/**/*.{js,jsx,html}'
  ],
  theme: {
    screens: {
      xs: '0px',
      sm: '425px',
      md: '768px',
      lg: '1024px',
      xl: '1440px'
    },
    colors: {
      primary: {
        blue: {
          light: '#85C5FF',
          DEFAULT: '#0085FF',
          dark: '#00488A',
          darkest: '#0c163f',
          darkestWithOpacity: '#37334F70'
        },
        purple: {
          light: '#CB89FF',
          DEFAULT: '#8F00FF',
          dark: '#4D008A',
          darkest: '#230c41'
        }
      },
      secondary: {
        white: {
          light: '#FFFFFF',
          DEFAULT: '#F1F1F1',
          withOpacity: '#F1F1F140'
        },
        black: {
          dark: '#000000',
          DEFAULT: '#1A1A1A',
          darkWithOpacity: '#00000080'
        },
        red: {
          light: '#FF8989',
          DEFAULT: '#FF0F00',
          dark: '#8A0000'
        }
      },
      transparent: 'transparent'
    },
    fontFamily: {
      body: ['Manrope', 'sans-serif']
    },
    fontSize: {
      xxs: ['12px', { lineHeight: '14.4px' }],
      xs: ['14px', { lineHeight: '16.8px' }],
      sm: ['16px', { lineHeight: '19.2px' }],
      md: ['20px', { lineHeight: '24px' }],
      lg: ['32px', { lineHeight: '38.4px' }],
      xl: ['40px', { lineHeight: '48px' }],
      '2xl': ['50px', { lineHeight: '60px' }],
      '3xl': ['60px', { lineHeight: '72px' }]
    },
    fontWeight: {
      light: '300',
      normal: '400',
      bold: '700'
    },
    spacing: {
      0: '0px',
      0.125: '1px',
      0.25: '2px',
      0.5: '4px',
      0.625: '5px',
      0.75: '6px',
      1: '8px',
      1.25: '10px',
      1.5: '12px',
      2: '16px',
      2.5: '20px',
      3: '24px',
      3.5: '28px',
      4: '32px',
      4.5: '36px',
      5: '40px',
      5.5: '44px',
      5.75: '46px',
      6: '48px',
      7: '56px',
      8: '64px',
      9: '72px',
      10: '80px',
      10.5: '84px',
      11.25: '90px',
      12: '96px',
      12.5: '100px',
      13: '104px',
      14: '112px',
      15: '120px',
      20: '160px'
    },
    zIndex: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      10: 10,
      11: 11,
      12: 12,
      13: 13,
      14: 14,
      15: 15,
      16: 16,
      17: 17,
      18: 18,
      19: 19,
      20: 20,
      25: 25,
      30: 30,
      40: 40,
      50: 50,
      75: 75,
      100: 100,
      auto: 'auto'
    },
    extend: {
      width: {
        3: '24px',
        4: '32px',
        '1/3': '33.3%',
        '1/2': '50%'
      },
      height: {
        3: '24px',
        4: '32px'
      },
      maxWidth: {
        20: '160px'
      }
    }
  },
  plugins: [],
}
