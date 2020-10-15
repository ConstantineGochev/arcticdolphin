export const toolNames = {
    YOUTUBE_DL: 'youtube-dl',
    RIP_ME: 'ripme',
    GALLERY_DL : 'gallery-dl'
}

export const youtubedlStaticOptions = {
    'ignore errors': '-i',
    'abort on error': '--abort-on-error',
    'dump user agent': '--dump-user-agent',
    'list extractors': '--list-extractors',
    'flat playlist': '--flat-playlist',
    'mark watched': '--mark-watched',
    'no mark watched': '--no-mark-watched',
    'bypass geographic restrictions': '--geo-bypass',
    'download only the video if a playlist and video': '--no-playlist',
    'download the playlist if a playlist and video': '--yes-playlist',
    'skip unavailable fragments': '--skip-unavailable-fragments',
    'abort on unavailable fragment': '--abort-on-unavailable-fragment',
    'keep fragments after download is finished': '--keep-fragments',
    'restrict filenames to only ASCII chars': '--restrict-filenames',
    'do not overwrite files': '--no-overwrites',
    'no part files write directly to output file': '--no-part',

}
export const galleryStaticOptions = {
    'Activate quiet mode': '--quiet',
    'Print various debugging information': '--verbose',
    'Print URLs instead of downloading': '--get-urls',
    'Print JSON information': '--dump-json',
    'Simulate data extraction; do not download anything': '--simulate',
    'Print a list of available keywords and example values for the given URL\'s': '--list-keywords',
    'Print a list of available extractor modules': '--list-modules',
    'Print a list of extractor classes with description, (sub)category and example URL': '--list-extractors',
    'Write downloaded intermediary pages to files in the current directory to debug problems': '--write-pages',
    'Do not use .part files': '--no-part',
    'Do not skip downloads; overwrite existing files': '--no-skip',
    'Do not set file modification times according to Last-Modified HTTP response headers': '--no-mtime',
    'Do not download any files': '--no-download',
    'Disable HTTPS certificate validation': '--no-check-certificate',
    'Store downloaded files in a ZIP archive': '--zip',
    'Convert Pixiv Ugoira to WebM (requires FFmpeg)': '--ugoira-conv',
    'Convert Pixiv Ugoira to WebM in VP9 lossless mode': '--ugoira-conv-lossless',
    'Write metadata to separate JSON files': '--write-metadata',
    'Write image tags to separate text files': '--write-tags',
    'Set file modification times according to \'date\' metadata': '--mtime-from-date',

}
export const galleryDynamicOptions = {
    'Maximum download rate (e.g. 500k or 2.5M)': '--limit-rate',
    'Maximum number of retries for failed HTTP requests or -1 for infinite retries (default: 4)': '--retries',
    'Abort extractor run after N consecutive file downloads have been skipped, e.g. if files with the same filename already exist': '--abort',
    'Timeout for HTTP connections (default: 30.0)': '--http-timeout',
    'Number of seconds to sleep before each download': '--sleep',
    'Do not download files smaller than SIZE (e.g. 500k or 2.5M)': '--filesize-min',
    'Do not download files larger than SIZE (e.g. 500k or 2.5M)': '--filesize-max',
    'Record all downloaded files in the archive file and skip downloading any file already in it.': '--download-archive',
    'Index-range(s) specifying which images to download. For example \'5-10\' or \',3-5,10-\'': '--range',
    'Like \', but applies to manga-chapters and other delegated URLs': '--chapter-range' ,
    'Python expression controlling which images to download. Files for which the expression evaluates to False are ignored. Available keys are the filename-specific ones listed by \'-K\'. Example: --filter "image_width >= 1000 and rating in (\',\'\'q\')"': '--filter'           ,
    'Like \', but applies to manga-chapters and other delegated URLs': '--chapter-filter'
}
export const youtubedlDynamicOptions = {
    'prefix for unqualified URLs': '--default-search' ,
    'Use the specified HTTP/HTTPS/SOCKS proxy': '--proxy' ,
    'Time to wait before giving up, in seconds': '--socket-timeout' ,
    'Client-side IP address to bind to': '--source-address' ,
    'Playlist video to start at (default is 1)': '--playlist-start' ,
    'Playlist video to end at (default is last)': '--playlist-end' ,
    'Download only matching titles (regex or caseless sub-string)': '--match-title' ,
    'Skip download for matching titles': '--reject-title' ,
    'Do not download any videos smaller than kilobytes': '--min-filesize' ,
    'Do not download any videos larger than kilobytes': '--max-filesize' ,
    'Download only videos uploaded in this date': '--date' ,
    'Download only videos uploaded on or before': '--datebefore' ,
    'Download only videos uploaded on or after': '--dateafter' ,
    'Do not download any videos with less than views': '--min-views' ,
    'Do not download any videos with more than views': '--max-views' ,
    'Download only videos suitable for the given age': '--age-limit' ,
    'Maximum download rate in bytes per second':'--limit-rate',
    'Number of retries (default is 10)':'--retries',
    ' Number of seconds to sleep before each download':'--sleep-interval',
    'Specify audio format':'--audio-format',

}
export const jobOptions = {
    'Delay the job certain miliseconds':'delay',
    'Add priority value': 'priority',
    'Reapeat the job every miliseconds *must add limit':'every',
    'Add limit how many times the job is repeated': 'limit',
    'Repeat according to CRON job specifications': 'cron'
}
export function getDynamicOption (option, param) {
    return option + ' ' + param
}
export const ripmeStaticOptions = {
    'don\'t retry after a 404': '--skip404',
    'save order of images in folder': '--saveorder',
    'don\'t save order of images in folder': '--nosaveorder',
    'don\'t create properties file': '--no-prop-file',
    're-rip all ripped albums': '--rerip',
    'overwrite existing files': '--overwrite'
}
