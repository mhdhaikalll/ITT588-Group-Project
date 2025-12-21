class Navbar extends HTMLElement {
    conntectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                nav {
                    background-color: rgb(38 38 38);
                    color: rgb(229 229 229);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                
                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 1rem 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .logo {
                    display: flex;
                    align-items: center;
                    font-weight: 700;
                    font-size: 1.25rem;
                    text-decoration: none;
                    color: inherit;
                }
                
                .logo-icon {
                    margin-right: 0.5rem;
                }
                
                .nav-links {
                    display: flex;
                    gap: 1.5rem;
                }
                
                .nav-link {
                    color: rgb(163 163 163);
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.2s;
                    display: flex;
                    align-items: center;
                }
                
                .nav-link:hover {
                    color: rgb(229 229 229);
                }
                
                .nav-link.active {
                    color: rgb(115 115 115);
                }
                
                .nav-link-icon {
                    margin-right: 0.5rem;
                    width: 1rem;
                    height: 1rem;
                }
                
                @media (max-width: 640px) {
                    .nav-container {
                        padding: 1rem;
                    }
                    
                    .nav-links {
                        gap: 1rem;
                    }
                    
                    .nav-link-text {
                        display: none;
                    }
                    
                    .nav-link-icon {
                        margin-right: 0;
                    }
                }
            </style>
            
            <nav>
                <div class="nav-container">
                    <a href="index.html" class="logo">
                        <i data-feather="award" class="logo-icon"></i>
                        <span>HabitHero</span>
                    </a>
                    
                    <div class="nav-links">
                        <a href="index.html" class="nav-link">
                            <i data-feather="home" class="nav-link-icon"></i>
                            <span class="nav-link-text">Home</span>
                        </a>
                        <a href="about.html" class="nav-link">
                            <i data-feather="users" class="nav-link-icon"></i>
                            <span class="nav-link-text">About</span>
                        </a>
                    </div>
                </div>
            </nav>
        `;
    }
}

customElements.define('nav-bar', Navbar);