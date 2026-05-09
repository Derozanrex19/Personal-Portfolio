import React, { useEffect, useState } from 'react';
import UIEventBus from '../EventBus';

const ResumeOverlay: React.FC = () => {
    const [resumeOpen, setResumeOpen] = useState(false);
    const [resumeUrl, setResumeUrl] = useState(
        '/documents/Resume_Updated%20(1).pdf'
    );

    useEffect(() => {
        UIEventBus.on('resumeOpen', (detail: { url?: string }) => {
            setResumeUrl(detail?.url || '/documents/Resume_Updated%20(1).pdf');
            setResumeOpen(true);
        });

        UIEventBus.on('resumeClose', () => {
            setResumeOpen(false);
        });
    }, []);

    useEffect(() => {
        if (!resumeOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                UIEventBus.dispatch('resumeCloseRequest', {});
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [resumeOpen]);

    if (!resumeOpen) return <></>;

    return (
        <div style={styles.backdrop}>
            <div style={styles.panel}>
                <div style={styles.header}>
                    <div>
                        <p style={styles.eyebrow}>Resume Preview</p>
                        <h3 style={styles.title}>John Wrexel Antopina</h3>
                    </div>
                    <div style={styles.actions}>
                        <a
                            href={resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={styles.linkButton}
                        >
                            Open PDF
                        </a>
                        <button
                            type="button"
                            style={styles.closeButton}
                            onClick={() =>
                                UIEventBus.dispatch('resumeCloseRequest', {})
                            }
                        >
                            Close
                        </button>
                    </div>
                </div>
                <div style={styles.viewerFrame}>
                    <iframe
                        src={resumeUrl}
                        title="John Wrexel Antopina Resume"
                        style={styles.iframe}
                    />
                </div>
            </div>
        </div>
    );
};

interface StyleSheetCSS {
    [key: string]: React.CSSProperties;
}

const styles: StyleSheetCSS = {
    backdrop: {
        position: 'fixed',
        inset: 0,
        padding: '32px',
        background:
            'linear-gradient(180deg, rgba(2, 10, 16, 0.72), rgba(2, 10, 16, 0.9))',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        zIndex: 30,
    },
    panel: {
        width: 'min(1100px, 100%)',
        height: 'min(820px, calc(100vh - 64px))',
        background: 'rgba(7, 17, 25, 0.96)',
        border: '1px solid rgba(196, 218, 230, 0.22)',
        boxShadow: '0 24px 80px rgba(0, 0, 0, 0.38)',
        borderRadius: '24px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        boxSizing: 'border-box',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '16px',
        flexWrap: 'wrap',
    },
    eyebrow: {
        margin: 0,
        opacity: 0.72,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        fontSize: '12px',
    },
    title: {
        margin: '8px 0 0 0',
        fontSize: '26px',
        color: '#f5fbff',
    },
    actions: {
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
    },
    linkButton: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        color: '#081018',
        background: '#d8f3ff',
        borderRadius: '999px',
        padding: '12px 18px',
        fontFamily: 'monospace',
        fontSize: '14px',
        fontWeight: 700,
    },
    closeButton: {
        appearance: 'none',
        border: '1px solid rgba(216, 243, 255, 0.28)',
        background: 'rgba(216, 243, 255, 0.08)',
        color: '#f5fbff',
        borderRadius: '999px',
        padding: '12px 18px',
        fontFamily: 'monospace',
        fontSize: '14px',
        cursor: 'pointer',
    },
    viewerFrame: {
        flex: 1,
        borderRadius: '18px',
        overflow: 'hidden',
        border: '1px solid rgba(196, 218, 230, 0.16)',
        background: '#f5f5f5',
    },
    iframe: {
        width: '100%',
        height: '100%',
        border: 'none',
        background: '#fff',
    },
};

export default ResumeOverlay;
