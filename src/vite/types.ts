import type { Alias } from 'vite';

/**
 * Configuration options for defineCraftConfig
 */
export interface CraftConfigOptions {
    /**
     * Laravel Vite plugin options
     */
    laravel?: {
        /** Entry points for the application */
        input?: string[];
        /** Enable file refresh on changes */
        refresh?: boolean;
    };

    /**
     * Additional Vite plugins to include
     */
    plugins?: any[];

    /**
     * Additional Vite aliases
     */
    aliases?: Alias[];

    /**
     * Local UI library configuration for development with symlinked packages
     */
    ui?: LocalUiOptions;
}

/**
 * Configuration for local UI library development
 *
 * When developing craft-ui alongside an app, this enables HMR by:
 * 1. Redirecting package imports to source files instead of dist/
 * 2. Resolving conflicting aliases (like @/) based on importer location
 */
export interface LocalUiOptions {
    /**
     * Relative path from app root to the symlinked craft-ui directory
     * @example '../craft-ui'
     */
    localPath?: string;
}

/**
 * Internal alias configuration for local package resolution
 */
export interface LocalAliasConfig {
    /** Regex pattern to match imports */
    pattern: RegExp;

    /** The replacement path or alias */
    replacement: string;

    /**
     * Absolute path to the library (for importer detection)
     * If set along with basePaths, enables context-aware resolution
     */
    libraryPath?: string;

    /**
     * Base paths for context-aware resolution
     */
    basePaths?: {
        /** Path to use when import is from the app */
        app: string;
        /** Path to use when import is from the library */
        library: string;
    };
}
