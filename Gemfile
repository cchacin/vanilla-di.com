source "https://rubygems.org"

# Jekyll and plugins for GitHub Pages compatibility
gem "jekyll", "~> 4.3.0"
gem "minima", "~> 2.5"

# Performance and development gems
gem "webrick", "~> 1.7" # Required for Ruby 3.0+

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

# Windows and JRuby compatibility
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock Jekyll to current version
gem "jekyll", ENV["JEKYLL_VERSION"] if ENV["JEKYLL_VERSION"]