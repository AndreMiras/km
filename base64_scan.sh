#!/bin/bash

# Usage example:
# ./base64_scan.sh --min-length 50 ./

# Default minimum length for base64 strings
MIN_LENGTH=50

# Help message
show_help() {
    echo "Usage: $0 [OPTIONS] [directory]"
    echo "Scan files for potential base64 encoded strings"
    echo
    echo "Options:"
    echo "  -l, --min-length NUMBER   Minimum length of base64 string (default: 50)"
    echo "  -e, --extensions LIST     Comma-separated list of extensions (default: js,ts,py)"
    echo "  -h, --help               Show this help message"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -l|--min-length)
            MIN_LENGTH="$2"
            shift 2
            ;;
        -e|--extensions)
            EXTENSIONS="$2"
            shift 2
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            DIRECTORY="$1"
            shift
            ;;
    esac
done

# Set defaults
DIRECTORY="${DIRECTORY:-.}"
EXTENSIONS="${EXTENSIONS:-js,ts,py}"

echo "Scanning directory: $DIRECTORY"
echo "File extensions: $EXTENSIONS"
echo "Minimum base64 length: $MIN_LENGTH"
echo

# Build the find command parts
FIND_PARTS=""
first=true
IFS=',' read -ra EXTS <<< "$EXTENSIONS"
for ext in "${EXTS[@]}"; do
    if [ "$first" = true ]; then
        FIND_PARTS="-name \"*.${ext}\""
        first=false
    else
        FIND_PARTS="${FIND_PARTS} -o -name \"*.${ext}\""
    fi
done

# Create pattern for base64 detection (without escaping the curly braces)
PATTERN="[A-Za-z0-9+/=]{$MIN_LENGTH,}"

# Execute the find and grep commands
eval "find \"$DIRECTORY\" -type f \\( $FIND_PARTS \\) -exec grep -l -E \"$PATTERN\" {} \\;"
