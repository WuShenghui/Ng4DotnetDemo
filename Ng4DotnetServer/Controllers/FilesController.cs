using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Ng4DotnetServer.Models;
using System;
using System.Collections.Generic;
using System.IO;

namespace Ng4DotnetServer.Controllers
{
    [Route("api/[controller]")]
    public class FilesController : Controller
    {
        public List<SystemFile> colSystemFiles = new List<SystemFile>();
        private readonly IHostingEnvironment _hostEnvironment;

        public FilesController(IHostingEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;
            // Set WebRootPath to wwwroot\Files directiry
            _hostEnvironment.WebRootPath =
                System.IO.Path.Combine(
                    Directory.GetCurrentDirectory(),
                    @"wwwroot\Files");
        }

        // api/Files/SystemFiles
        [HttpGet("[action]")]
        public IEnumerable<SystemFile> SystemFiles()
        {
            colSystemFiles = new List<SystemFile>();
            if (Directory.Exists(_hostEnvironment.WebRootPath))
            {
                // Get Files
                ProcessDirectory(_hostEnvironment.WebRootPath);
            }
            return colSystemFiles;
        }

        // api/Files/DeleteFile
        [HttpPost]
        public IActionResult Post([FromBody]SystemFile file)
        {
            try
            {
                // Allow user to only delete a file in Files directory
                string FileToDelete =
                    Path.Combine(_hostEnvironment.WebRootPath, file.FileName);
                System.IO.File.Delete(FileToDelete);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Ok();
        }

        // Utility
        // Process all files in the directory passed in, recurse on any directories 
        // that are found, and process the files they contain.
        public void ProcessDirectory(string targetDirectory)
        {
            // Process the list of files found in the directory.
            string[] fileEntries = Directory.GetFiles(targetDirectory);
            foreach (string fileName in fileEntries)
            {
                ProcessFile(fileName);
            }
            // Recurse into subdirectories of this directory.
            string[] subdirectoryEntries = Directory.GetDirectories(targetDirectory);
            foreach (string subdirectory in subdirectoryEntries)
                ProcessDirectory(subdirectory);
        }

        // Insert logic for processing found files here.
        public void ProcessFile(string path)
        {
            string FileName = Path.GetFileName(path);
            string FilePath = path;
            colSystemFiles.Add(new SystemFile() { FileName = FileName, FilePath = FilePath });
        }
    }
}