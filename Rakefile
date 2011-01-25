require "erb"
require "fileutils"
require "pathname"
require "base64"
require "cgi"

APP_ROOT = Pathname.new(File.dirname(__FILE__))

def include_file(path)
  File.read(APP_ROOT + path)
end

def make_data_uri(path, content_type)
  content = File.read(APP_ROOT + path)
  outuri = 'data:' + content_type
  unless content_type =~ /^text/i # base64 encode if not text
    outuri += ';base64'
    content = Base64.encode64(content).gsub("\n", '')
  else
    content = CGI::escape(content)
  end
  outuri += ",#{content}"
end

desc "Compile Bombs"
task :compile do
  template = File.read(APP_ROOT + "bombs.html.erb")
  template = ERB.new(template)
  FileUtils.mkdir_p("output")
  File.open(APP_ROOT + "output/bombs.html", "w") do |file|
    file.write(template.result(binding))
  end
end

task :default => :compile
