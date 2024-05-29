import React from "react";

type LogoProps = {} & React.SVGProps<SVGSVGElement>;

export const Logo: React.FC<LogoProps> = ({ ...props }) => {
    return (
        // <svg
        //     width="94"
        //     height="94"
        //     viewBox="0 0 94 94"
        //     fill="none"
        //     xmlns="http://www.w3.org/2000/svg"
        //     {...props}
        // >
        //     <circle
        //         cx="47"
        //         cy="47"
        //         r="43.5"
        //         // stroke={primaryColor || `#FFF`}
        //         stroke="currentColor"
        //         stroke-width="7"
        //     />
        //     <path d="M43 20H51V92H43V20Z" fill="currentColor" />
        //     <path
        //         d="M63.7891 25L69.4459 30.6569L30.653 69.4498L24.9961 63.7929L63.7891 25Z"
        //         fill="currentColor"
        //     />
        //     <path d="M3 51V43H75V51H3Z" fill="currentColor" />
        //     <path
        //         d="M25 30.6562L30.6569 24.9994L69.4498 63.7923L63.7929 69.4492L25 30.6562Z"
        //         fill="currentColor"
        //     />
        // </svg>
        <svg
            width="524"
            height="94"
            viewBox="0 0 524 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle
                cx="47"
                cy="47"
                r="43.5"
                stroke="currentColor"
                stroke-width="7"
            />
            <path d="M43 20H51V92H43V20Z" fill="currentColor" />
            <path
                d="M63.7891 25L69.4459 30.6569L30.653 69.4498L24.9961 63.7929L63.7891 25Z"
                fill="currentColor"
            />
            <path d="M3 51V43H75V51H3Z" fill="currentColor" />
            <path
                d="M25 30.6562L30.6569 24.9994L69.4498 63.7923L63.7929 69.4492L25 30.6562Z"
                fill="currentColor"
            />
            <path
                d="M122.726 37.327H132.041V42.295H132.248C133.49 40.225 135.1 38.73 137.078 37.81C139.056 36.844 141.08 36.361 143.15 36.361C145.772 36.361 147.911 36.729 149.567 37.465C151.269 38.155 152.603 39.144 153.569 40.432C154.535 41.674 155.202 43.215 155.57 45.055C155.984 46.849 156.191 48.85 156.191 51.058V73H146.393V52.852C146.393 49.908 145.933 47.723 145.013 46.297C144.093 44.825 142.46 44.089 140.114 44.089C137.446 44.089 135.514 44.894 134.318 46.504C133.122 48.068 132.524 50.667 132.524 54.301V73H122.726V37.327ZM170.941 55.198C170.941 56.624 171.079 58.027 171.355 59.407C171.631 60.741 172.091 61.96 172.735 63.064C173.425 64.122 174.322 64.973 175.426 65.617C176.53 66.261 177.91 66.583 179.566 66.583C181.222 66.583 182.602 66.261 183.706 65.617C184.856 64.973 185.753 64.122 186.397 63.064C187.087 61.96 187.57 60.741 187.846 59.407C188.122 58.027 188.26 56.624 188.26 55.198C188.26 53.772 188.122 52.369 187.846 50.989C187.57 49.609 187.087 48.39 186.397 47.332C185.753 46.274 184.856 45.423 183.706 44.779C182.602 44.089 181.222 43.744 179.566 43.744C177.91 43.744 176.53 44.089 175.426 44.779C174.322 45.423 173.425 46.274 172.735 47.332C172.091 48.39 171.631 49.609 171.355 50.989C171.079 52.369 170.941 53.772 170.941 55.198ZM161.143 55.198C161.143 52.346 161.58 49.77 162.454 47.47C163.328 45.124 164.57 43.146 166.18 41.536C167.79 39.88 169.722 38.615 171.976 37.741C174.23 36.821 176.76 36.361 179.566 36.361C182.372 36.361 184.902 36.821 187.156 37.741C189.456 38.615 191.411 39.88 193.021 41.536C194.631 43.146 195.873 45.124 196.747 47.47C197.621 49.77 198.058 52.346 198.058 55.198C198.058 58.05 197.621 60.626 196.747 62.926C195.873 65.226 194.631 67.204 193.021 68.86C191.411 70.47 189.456 71.712 187.156 72.586C184.902 73.46 182.372 73.897 179.566 73.897C176.76 73.897 174.23 73.46 171.976 72.586C169.722 71.712 167.79 70.47 166.18 68.86C164.57 67.204 163.328 65.226 162.454 62.926C161.58 60.626 161.143 58.05 161.143 55.198ZM229.2 55.198C229.2 53.68 229.039 52.231 228.717 50.851C228.395 49.471 227.889 48.252 227.199 47.194C226.509 46.136 225.635 45.308 224.577 44.71C223.565 44.066 222.323 43.744 220.851 43.744C219.425 43.744 218.183 44.066 217.125 44.71C216.067 45.308 215.193 46.136 214.503 47.194C213.813 48.252 213.307 49.471 212.985 50.851C212.663 52.231 212.502 53.68 212.502 55.198C212.502 56.67 212.663 58.096 212.985 59.476C213.307 60.856 213.813 62.075 214.503 63.133C215.193 64.191 216.067 65.042 217.125 65.686C218.183 66.284 219.425 66.583 220.851 66.583C222.323 66.583 223.565 66.284 224.577 65.686C225.635 65.042 226.509 64.191 227.199 63.133C227.889 62.075 228.395 60.856 228.717 59.476C229.039 58.096 229.2 56.67 229.2 55.198ZM203.049 23.734H212.847V41.674H212.985C214.181 39.834 215.791 38.5 217.815 37.672C219.885 36.798 222.024 36.361 224.232 36.361C226.026 36.361 227.797 36.729 229.545 37.465C231.293 38.201 232.857 39.328 234.237 40.846C235.663 42.364 236.813 44.319 237.687 46.711C238.561 49.057 238.998 51.863 238.998 55.129C238.998 58.395 238.561 61.224 237.687 63.616C236.813 65.962 235.663 67.894 234.237 69.412C232.857 70.93 231.293 72.057 229.545 72.793C227.797 73.529 226.026 73.897 224.232 73.897C221.61 73.897 219.264 73.483 217.194 72.655C215.124 71.827 213.56 70.424 212.502 68.446H212.364V73H203.049V23.734ZM244.127 23.734H253.925V73H244.127V23.734ZM284.272 51.334C283.812 48.85 282.984 46.964 281.788 45.676C280.638 44.388 278.867 43.744 276.475 43.744C274.911 43.744 273.6 44.02 272.542 44.572C271.53 45.078 270.702 45.722 270.058 46.504C269.46 47.286 269.023 48.114 268.747 48.988C268.517 49.862 268.379 50.644 268.333 51.334H284.272ZM268.333 57.544C268.471 60.718 269.276 63.018 270.748 64.444C272.22 65.87 274.336 66.583 277.096 66.583C279.074 66.583 280.776 66.1 282.202 65.134C283.628 64.122 284.502 63.064 284.824 61.96H293.449C292.069 66.238 289.953 69.297 287.101 71.137C284.249 72.977 280.799 73.897 276.751 73.897C273.945 73.897 271.415 73.46 269.161 72.586C266.907 71.666 264.998 70.378 263.434 68.722C261.87 67.066 260.651 65.088 259.777 62.788C258.949 60.488 258.535 57.958 258.535 55.198C258.535 52.53 258.972 50.046 259.846 47.746C260.72 45.446 261.962 43.468 263.572 41.812C265.182 40.11 267.091 38.776 269.299 37.81C271.553 36.844 274.037 36.361 276.751 36.361C279.787 36.361 282.432 36.959 284.686 38.155C286.94 39.305 288.78 40.869 290.206 42.847C291.678 44.825 292.736 47.079 293.38 49.609C294.024 52.139 294.254 54.784 294.07 57.544H268.333ZM328.745 37.327H335.921V43.882H328.745V61.546C328.745 63.202 329.021 64.306 329.573 64.858C330.125 65.41 331.229 65.686 332.885 65.686C333.437 65.686 333.966 65.663 334.472 65.617C334.978 65.571 335.461 65.502 335.921 65.41V73C335.093 73.138 334.173 73.23 333.161 73.276C332.149 73.322 331.16 73.345 330.194 73.345C328.676 73.345 327.227 73.23 325.847 73C324.513 72.816 323.317 72.425 322.259 71.827C321.247 71.229 320.442 70.378 319.844 69.274C319.246 68.17 318.947 66.721 318.947 64.927V43.882H313.013V37.327H318.947V26.632H328.745V37.327ZM339.203 37.327H348.518V43.951H348.656C349.116 42.847 349.737 41.835 350.519 40.915C351.301 39.949 352.198 39.144 353.21 38.5C354.222 37.81 355.303 37.281 356.453 36.913C357.603 36.545 358.799 36.361 360.041 36.361C360.685 36.361 361.398 36.476 362.18 36.706V45.814C361.72 45.722 361.168 45.653 360.524 45.607C359.88 45.515 359.259 45.469 358.661 45.469C356.867 45.469 355.349 45.768 354.107 46.366C352.865 46.964 351.853 47.792 351.071 48.85C350.335 49.862 349.806 51.058 349.484 52.438C349.162 53.818 349.001 55.313 349.001 56.923V73H339.203V37.327ZM364.227 48.298C364.365 45.998 364.94 44.089 365.952 42.571C366.964 41.053 368.252 39.834 369.816 38.914C371.38 37.994 373.128 37.35 375.06 36.982C377.038 36.568 379.016 36.361 380.994 36.361C382.788 36.361 384.605 36.499 386.445 36.775C388.285 37.005 389.964 37.488 391.482 38.224C393 38.96 394.242 39.995 395.208 41.329C396.174 42.617 396.657 44.342 396.657 46.504V65.065C396.657 66.675 396.749 68.216 396.933 69.688C397.117 71.16 397.439 72.264 397.899 73H387.963C387.779 72.448 387.618 71.896 387.48 71.344C387.388 70.746 387.319 70.148 387.273 69.55C385.709 71.16 383.869 72.287 381.753 72.931C379.637 73.575 377.475 73.897 375.267 73.897C373.565 73.897 371.978 73.69 370.506 73.276C369.034 72.862 367.746 72.218 366.642 71.344C365.538 70.47 364.664 69.366 364.02 68.032C363.422 66.698 363.123 65.111 363.123 63.271C363.123 61.247 363.468 59.591 364.158 58.303C364.894 56.969 365.814 55.911 366.918 55.129C368.068 54.347 369.356 53.772 370.782 53.404C372.254 52.99 373.726 52.668 375.198 52.438C376.67 52.208 378.119 52.024 379.545 51.886C380.971 51.748 382.236 51.541 383.34 51.265C384.444 50.989 385.318 50.598 385.962 50.092C386.606 49.54 386.905 48.758 386.859 47.746C386.859 46.688 386.675 45.86 386.307 45.262C385.985 44.618 385.525 44.135 384.927 43.813C384.375 43.445 383.708 43.215 382.926 43.123C382.19 42.985 381.385 42.916 380.511 42.916C378.579 42.916 377.061 43.33 375.957 44.158C374.853 44.986 374.209 46.366 374.025 48.298H364.227ZM386.859 55.543C386.445 55.911 385.916 56.21 385.272 56.44C384.674 56.624 384.007 56.785 383.271 56.923C382.581 57.061 381.845 57.176 381.063 57.268C380.281 57.36 379.499 57.475 378.717 57.613C377.981 57.751 377.245 57.935 376.509 58.165C375.819 58.395 375.198 58.717 374.646 59.131C374.14 59.499 373.726 59.982 373.404 60.58C373.082 61.178 372.921 61.937 372.921 62.857C372.921 63.731 373.082 64.467 373.404 65.065C373.726 65.663 374.163 66.146 374.715 66.514C375.267 66.836 375.911 67.066 376.647 67.204C377.383 67.342 378.142 67.411 378.924 67.411C380.856 67.411 382.351 67.089 383.409 66.445C384.467 65.801 385.249 65.042 385.755 64.168C386.261 63.248 386.56 62.328 386.652 61.408C386.79 60.488 386.859 59.752 386.859 59.2V55.543ZM422.616 73H411.714L399.501 37.327H409.782L417.303 61.684H417.441L424.962 37.327H434.691L422.616 73ZM461.362 51.334C460.902 48.85 460.074 46.964 458.878 45.676C457.728 44.388 455.957 43.744 453.565 43.744C452.001 43.744 450.69 44.02 449.632 44.572C448.62 45.078 447.792 45.722 447.148 46.504C446.55 47.286 446.113 48.114 445.837 48.988C445.607 49.862 445.469 50.644 445.423 51.334H461.362ZM445.423 57.544C445.561 60.718 446.366 63.018 447.838 64.444C449.31 65.87 451.426 66.583 454.186 66.583C456.164 66.583 457.866 66.1 459.292 65.134C460.718 64.122 461.592 63.064 461.914 61.96H470.539C469.159 66.238 467.043 69.297 464.191 71.137C461.339 72.977 457.889 73.897 453.841 73.897C451.035 73.897 448.505 73.46 446.251 72.586C443.997 71.666 442.088 70.378 440.524 68.722C438.96 67.066 437.741 65.088 436.867 62.788C436.039 60.488 435.625 57.958 435.625 55.198C435.625 52.53 436.062 50.046 436.936 47.746C437.81 45.446 439.052 43.468 440.662 41.812C442.272 40.11 444.181 38.776 446.389 37.81C448.643 36.844 451.127 36.361 453.841 36.361C456.877 36.361 459.522 36.959 461.776 38.155C464.03 39.305 465.87 40.869 467.296 42.847C468.768 44.825 469.826 47.079 470.47 49.609C471.114 52.139 471.344 54.784 471.16 57.544H445.423ZM475.867 23.734H485.665V73H475.867V23.734ZM499.59 61.408C499.59 62.466 499.797 63.386 500.211 64.168C500.671 64.904 501.246 65.525 501.936 66.031C502.626 66.491 503.408 66.836 504.282 67.066C505.202 67.296 506.145 67.411 507.111 67.411C507.801 67.411 508.514 67.342 509.25 67.204C510.032 67.02 510.722 66.767 511.32 66.445C511.964 66.077 512.493 65.617 512.907 65.065C513.321 64.467 513.528 63.731 513.528 62.857C513.528 61.385 512.539 60.281 510.561 59.545C508.629 58.809 505.915 58.073 502.419 57.337C500.993 57.015 499.59 56.647 498.21 56.233C496.876 55.773 495.68 55.198 494.622 54.508C493.564 53.772 492.713 52.875 492.069 51.817C491.425 50.713 491.103 49.379 491.103 47.815C491.103 45.515 491.54 43.629 492.414 42.157C493.334 40.685 494.53 39.535 496.002 38.707C497.474 37.833 499.13 37.235 500.97 36.913C502.81 36.545 504.696 36.361 506.628 36.361C508.56 36.361 510.423 36.545 512.217 36.913C514.057 37.281 515.69 37.902 517.116 38.776C518.542 39.65 519.715 40.823 520.635 42.295C521.601 43.721 522.176 45.538 522.36 47.746H513.045C512.907 45.86 512.194 44.595 510.906 43.951C509.618 43.261 508.1 42.916 506.352 42.916C505.8 42.916 505.202 42.962 504.558 43.054C503.914 43.1 503.316 43.238 502.764 43.468C502.258 43.698 501.821 44.043 501.453 44.503C501.085 44.917 500.901 45.492 500.901 46.228C500.901 47.102 501.223 47.815 501.867 48.367C502.511 48.919 503.339 49.379 504.351 49.747C505.409 50.069 506.605 50.368 507.939 50.644C509.273 50.92 510.63 51.219 512.01 51.541C513.436 51.863 514.816 52.254 516.15 52.714C517.53 53.174 518.749 53.795 519.807 54.577C520.865 55.313 521.716 56.256 522.36 57.406C523.004 58.51 523.326 59.89 523.326 61.546C523.326 63.892 522.843 65.87 521.877 67.48C520.957 69.044 519.738 70.309 518.22 71.275C516.702 72.241 514.954 72.908 512.976 73.276C511.044 73.69 509.066 73.897 507.042 73.897C504.972 73.897 502.948 73.69 500.97 73.276C498.992 72.862 497.221 72.172 495.657 71.206C494.139 70.24 492.874 68.975 491.862 67.411C490.896 65.801 490.367 63.8 490.275 61.408H499.59Z"
                fill="currentColor"
            />
        </svg>

        // <svg
        //     width="518"
        //     height="94"
        //     viewBox="0 0 518 94"
        //     fill="none"
        //     xmlns="http://www.w3.org/2000/svg"
        //     {...props}
        // >
        //     <circle
        //         cx="47"
        //         cy="47"
        //         r="43.5"
        //         stroke="currentColor"
        //         stroke-width="7"
        //     />
        //     <path d="M43 20H51V92H43V20Z" fill="currentColor" />
        //     <path
        //         d="M63.7891 25L69.4459 30.6569L30.653 69.4498L24.9961 63.7929L63.7891 25Z"
        //         fill="currentColor"
        //     />
        //     <path d="M3 51V43H75V51H3Z" fill="currentColor" />
        //     <path
        //         d="M25 30.6562L30.6569 24.9994L69.4498 63.7923L63.7929 69.4492L25 30.6562Z"
        //         fill="currentColor"
        //     />
        //     <path
        //         d="M124.726 37.327H134.041V42.295H134.248C135.49 40.225 137.1 38.73 139.078 37.81C141.056 36.844 143.08 36.361 145.15 36.361C147.772 36.361 149.911 36.729 151.567 37.465C153.269 38.155 154.603 39.144 155.569 40.432C156.535 41.674 157.202 43.215 157.57 45.055C157.984 46.849 158.191 48.85 158.191 51.058V73H148.393V52.852C148.393 49.908 147.933 47.723 147.013 46.297C146.093 44.825 144.46 44.089 142.114 44.089C139.446 44.089 137.514 44.894 136.318 46.504C135.122 48.068 134.524 50.667 134.524 54.301V73H124.726V37.327ZM172.251 55.198C172.251 56.624 172.389 58.027 172.665 59.407C172.941 60.741 173.401 61.96 174.045 63.064C174.735 64.122 175.632 64.973 176.736 65.617C177.84 66.261 179.22 66.583 180.876 66.583C182.532 66.583 183.912 66.261 185.016 65.617C186.166 64.973 187.063 64.122 187.707 63.064C188.397 61.96 188.88 60.741 189.156 59.407C189.432 58.027 189.57 56.624 189.57 55.198C189.57 53.772 189.432 52.369 189.156 50.989C188.88 49.609 188.397 48.39 187.707 47.332C187.063 46.274 186.166 45.423 185.016 44.779C183.912 44.089 182.532 43.744 180.876 43.744C179.22 43.744 177.84 44.089 176.736 44.779C175.632 45.423 174.735 46.274 174.045 47.332C173.401 48.39 172.941 49.609 172.665 50.989C172.389 52.369 172.251 53.772 172.251 55.198ZM162.453 55.198C162.453 52.346 162.89 49.77 163.764 47.47C164.638 45.124 165.88 43.146 167.49 41.536C169.1 39.88 171.032 38.615 173.286 37.741C175.54 36.821 178.07 36.361 180.876 36.361C183.682 36.361 186.212 36.821 188.466 37.741C190.766 38.615 192.721 39.88 194.331 41.536C195.941 43.146 197.183 45.124 198.057 47.47C198.931 49.77 199.368 52.346 199.368 55.198C199.368 58.05 198.931 60.626 198.057 62.926C197.183 65.226 195.941 67.204 194.331 68.86C192.721 70.47 190.766 71.712 188.466 72.586C186.212 73.46 183.682 73.897 180.876 73.897C178.07 73.897 175.54 73.46 173.286 72.586C171.032 71.712 169.1 70.47 167.49 68.86C165.88 67.204 164.638 65.226 163.764 62.926C162.89 60.626 162.453 58.05 162.453 55.198ZM229.82 55.198C229.82 53.68 229.659 52.231 229.337 50.851C229.015 49.471 228.509 48.252 227.819 47.194C227.129 46.136 226.255 45.308 225.197 44.71C224.185 44.066 222.943 43.744 221.471 43.744C220.045 43.744 218.803 44.066 217.745 44.71C216.687 45.308 215.813 46.136 215.123 47.194C214.433 48.252 213.927 49.471 213.605 50.851C213.283 52.231 213.122 53.68 213.122 55.198C213.122 56.67 213.283 58.096 213.605 59.476C213.927 60.856 214.433 62.075 215.123 63.133C215.813 64.191 216.687 65.042 217.745 65.686C218.803 66.284 220.045 66.583 221.471 66.583C222.943 66.583 224.185 66.284 225.197 65.686C226.255 65.042 227.129 64.191 227.819 63.133C228.509 62.075 229.015 60.856 229.337 59.476C229.659 58.096 229.82 56.67 229.82 55.198ZM203.669 23.734H213.467V41.674H213.605C214.801 39.834 216.411 38.5 218.435 37.672C220.505 36.798 222.644 36.361 224.852 36.361C226.646 36.361 228.417 36.729 230.165 37.465C231.913 38.201 233.477 39.328 234.857 40.846C236.283 42.364 237.433 44.319 238.307 46.711C239.181 49.057 239.618 51.863 239.618 55.129C239.618 58.395 239.181 61.224 238.307 63.616C237.433 65.962 236.283 67.894 234.857 69.412C233.477 70.93 231.913 72.057 230.165 72.793C228.417 73.529 226.646 73.897 224.852 73.897C222.23 73.897 219.884 73.483 217.814 72.655C215.744 71.827 214.18 70.424 213.122 68.446H212.984V73H203.669V23.734ZM244.057 23.734H253.855V73H244.057V23.734ZM283.512 51.334C283.052 48.85 282.224 46.964 281.028 45.676C279.878 44.388 278.107 43.744 275.715 43.744C274.151 43.744 272.84 44.02 271.782 44.572C270.77 45.078 269.942 45.722 269.298 46.504C268.7 47.286 268.263 48.114 267.987 48.988C267.757 49.862 267.619 50.644 267.573 51.334H283.512ZM267.573 57.544C267.711 60.718 268.516 63.018 269.988 64.444C271.46 65.87 273.576 66.583 276.336 66.583C278.314 66.583 280.016 66.1 281.442 65.134C282.868 64.122 283.742 63.064 284.064 61.96H292.689C291.309 66.238 289.193 69.297 286.341 71.137C283.489 72.977 280.039 73.897 275.991 73.897C273.185 73.897 270.655 73.46 268.401 72.586C266.147 71.666 264.238 70.378 262.674 68.722C261.11 67.066 259.891 65.088 259.017 62.788C258.189 60.488 257.775 57.958 257.775 55.198C257.775 52.53 258.212 50.046 259.086 47.746C259.96 45.446 261.202 43.468 262.812 41.812C264.422 40.11 266.331 38.776 268.539 37.81C270.793 36.844 273.277 36.361 275.991 36.361C279.027 36.361 281.672 36.959 283.926 38.155C286.18 39.305 288.02 40.869 289.446 42.847C290.918 44.825 291.976 47.079 292.62 49.609C293.264 52.139 293.494 54.784 293.31 57.544H267.573ZM326.605 37.327H333.781V43.882H326.605V61.546C326.605 63.202 326.881 64.306 327.433 64.858C327.985 65.41 329.089 65.686 330.745 65.686C331.297 65.686 331.826 65.663 332.332 65.617C332.838 65.571 333.321 65.502 333.781 65.41V73C332.953 73.138 332.033 73.23 331.021 73.276C330.009 73.322 329.02 73.345 328.054 73.345C326.536 73.345 325.087 73.23 323.707 73C322.373 72.816 321.177 72.425 320.119 71.827C319.107 71.229 318.302 70.378 317.704 69.274C317.106 68.17 316.807 66.721 316.807 64.927V43.882H310.873V37.327H316.807V26.632H326.605V37.327ZM336.373 37.327H345.688V43.951H345.826C346.286 42.847 346.907 41.835 347.689 40.915C348.471 39.949 349.368 39.144 350.38 38.5C351.392 37.81 352.473 37.281 353.623 36.913C354.773 36.545 355.969 36.361 357.211 36.361C357.855 36.361 358.568 36.476 359.35 36.706V45.814C358.89 45.722 358.338 45.653 357.694 45.607C357.05 45.515 356.429 45.469 355.831 45.469C354.037 45.469 352.519 45.768 351.277 46.366C350.035 46.964 349.023 47.792 348.241 48.85C347.505 49.862 346.976 51.058 346.654 52.438C346.332 53.818 346.171 55.313 346.171 56.923V73H336.373V37.327ZM360.707 48.298C360.845 45.998 361.42 44.089 362.432 42.571C363.444 41.053 364.732 39.834 366.296 38.914C367.86 37.994 369.608 37.35 371.54 36.982C373.518 36.568 375.496 36.361 377.474 36.361C379.268 36.361 381.085 36.499 382.925 36.775C384.765 37.005 386.444 37.488 387.962 38.224C389.48 38.96 390.722 39.995 391.688 41.329C392.654 42.617 393.137 44.342 393.137 46.504V65.065C393.137 66.675 393.229 68.216 393.413 69.688C393.597 71.16 393.919 72.264 394.379 73H384.443C384.259 72.448 384.098 71.896 383.96 71.344C383.868 70.746 383.799 70.148 383.753 69.55C382.189 71.16 380.349 72.287 378.233 72.931C376.117 73.575 373.955 73.897 371.747 73.897C370.045 73.897 368.458 73.69 366.986 73.276C365.514 72.862 364.226 72.218 363.122 71.344C362.018 70.47 361.144 69.366 360.5 68.032C359.902 66.698 359.603 65.111 359.603 63.271C359.603 61.247 359.948 59.591 360.638 58.303C361.374 56.969 362.294 55.911 363.398 55.129C364.548 54.347 365.836 53.772 367.262 53.404C368.734 52.99 370.206 52.668 371.678 52.438C373.15 52.208 374.599 52.024 376.025 51.886C377.451 51.748 378.716 51.541 379.82 51.265C380.924 50.989 381.798 50.598 382.442 50.092C383.086 49.54 383.385 48.758 383.339 47.746C383.339 46.688 383.155 45.86 382.787 45.262C382.465 44.618 382.005 44.135 381.407 43.813C380.855 43.445 380.188 43.215 379.406 43.123C378.67 42.985 377.865 42.916 376.991 42.916C375.059 42.916 373.541 43.33 372.437 44.158C371.333 44.986 370.689 46.366 370.505 48.298H360.707ZM383.339 55.543C382.925 55.911 382.396 56.21 381.752 56.44C381.154 56.624 380.487 56.785 379.751 56.923C379.061 57.061 378.325 57.176 377.543 57.268C376.761 57.36 375.979 57.475 375.197 57.613C374.461 57.751 373.725 57.935 372.989 58.165C372.299 58.395 371.678 58.717 371.126 59.131C370.62 59.499 370.206 59.982 369.884 60.58C369.562 61.178 369.401 61.937 369.401 62.857C369.401 63.731 369.562 64.467 369.884 65.065C370.206 65.663 370.643 66.146 371.195 66.514C371.747 66.836 372.391 67.066 373.127 67.204C373.863 67.342 374.622 67.411 375.404 67.411C377.336 67.411 378.831 67.089 379.889 66.445C380.947 65.801 381.729 65.042 382.235 64.168C382.741 63.248 383.04 62.328 383.132 61.408C383.27 60.488 383.339 59.752 383.339 59.2V55.543ZM418.406 73H407.504L395.291 37.327H405.572L413.093 61.684H413.231L420.752 37.327H430.481L418.406 73ZM456.462 51.334C456.002 48.85 455.174 46.964 453.978 45.676C452.828 44.388 451.057 43.744 448.665 43.744C447.101 43.744 445.79 44.02 444.732 44.572C443.72 45.078 442.892 45.722 442.248 46.504C441.65 47.286 441.213 48.114 440.937 48.988C440.707 49.862 440.569 50.644 440.523 51.334H456.462ZM440.523 57.544C440.661 60.718 441.466 63.018 442.938 64.444C444.41 65.87 446.526 66.583 449.286 66.583C451.264 66.583 452.966 66.1 454.392 65.134C455.818 64.122 456.692 63.064 457.014 61.96H465.639C464.259 66.238 462.143 69.297 459.291 71.137C456.439 72.977 452.989 73.897 448.941 73.897C446.135 73.897 443.605 73.46 441.351 72.586C439.097 71.666 437.188 70.378 435.624 68.722C434.06 67.066 432.841 65.088 431.967 62.788C431.139 60.488 430.725 57.958 430.725 55.198C430.725 52.53 431.162 50.046 432.036 47.746C432.91 45.446 434.152 43.468 435.762 41.812C437.372 40.11 439.281 38.776 441.489 37.81C443.743 36.844 446.227 36.361 448.941 36.361C451.977 36.361 454.622 36.959 456.876 38.155C459.13 39.305 460.97 40.869 462.396 42.847C463.868 44.825 464.926 47.079 465.57 49.609C466.214 52.139 466.444 54.784 466.26 57.544H440.523ZM470.277 23.734H480.075V73H470.277V23.734ZM493.31 61.408C493.31 62.466 493.517 63.386 493.931 64.168C494.391 64.904 494.966 65.525 495.656 66.031C496.346 66.491 497.128 66.836 498.002 67.066C498.922 67.296 499.865 67.411 500.831 67.411C501.521 67.411 502.234 67.342 502.97 67.204C503.752 67.02 504.442 66.767 505.04 66.445C505.684 66.077 506.213 65.617 506.627 65.065C507.041 64.467 507.248 63.731 507.248 62.857C507.248 61.385 506.259 60.281 504.281 59.545C502.349 58.809 499.635 58.073 496.139 57.337C494.713 57.015 493.31 56.647 491.93 56.233C490.596 55.773 489.4 55.198 488.342 54.508C487.284 53.772 486.433 52.875 485.789 51.817C485.145 50.713 484.823 49.379 484.823 47.815C484.823 45.515 485.26 43.629 486.134 42.157C487.054 40.685 488.25 39.535 489.722 38.707C491.194 37.833 492.85 37.235 494.69 36.913C496.53 36.545 498.416 36.361 500.348 36.361C502.28 36.361 504.143 36.545 505.937 36.913C507.777 37.281 509.41 37.902 510.836 38.776C512.262 39.65 513.435 40.823 514.355 42.295C515.321 43.721 515.896 45.538 516.08 47.746H506.765C506.627 45.86 505.914 44.595 504.626 43.951C503.338 43.261 501.82 42.916 500.072 42.916C499.52 42.916 498.922 42.962 498.278 43.054C497.634 43.1 497.036 43.238 496.484 43.468C495.978 43.698 495.541 44.043 495.173 44.503C494.805 44.917 494.621 45.492 494.621 46.228C494.621 47.102 494.943 47.815 495.587 48.367C496.231 48.919 497.059 49.379 498.071 49.747C499.129 50.069 500.325 50.368 501.659 50.644C502.993 50.92 504.35 51.219 505.73 51.541C507.156 51.863 508.536 52.254 509.87 52.714C511.25 53.174 512.469 53.795 513.527 54.577C514.585 55.313 515.436 56.256 516.08 57.406C516.724 58.51 517.046 59.89 517.046 61.546C517.046 63.892 516.563 65.87 515.597 67.48C514.677 69.044 513.458 70.309 511.94 71.275C510.422 72.241 508.674 72.908 506.696 73.276C504.764 73.69 502.786 73.897 500.762 73.897C498.692 73.897 496.668 73.69 494.69 73.276C492.712 72.862 490.941 72.172 489.377 71.206C487.859 70.24 486.594 68.975 485.582 67.411C484.616 65.801 484.087 63.8 483.995 61.408H493.31Z"
        //         fill="currentColor"
        //     />
        // </svg>
    );
};
