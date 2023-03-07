using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using APITestingsReact.Models;

namespace APITestingsReact.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class TestingController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public TestingController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpGet]

        public JsonResult Get()
        {
            string query = @"
                    select Id, Name, Grade,
                    convert(varchar(10),Date,120) as Date
                    , Subject, NumberOfPases, [User]
                    from dbo.Testing
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }



        [HttpPost]
        public JsonResult Post(Testing testing)
        {
            string query = @"
                     insert into dbo.Testing 
                    (Name,Grade,Date,Subject, NumberOfPases, [User])
                    values 
                    (
                    '" + testing.Name + @"'
                    ,'" + testing.Grade + @"'
                    ,'" + testing.Date + @"'
                    ,'" + testing.Subject + @"'
                    ,'" + testing.NumberOfPases + @"'
                    ,'" + testing.User + @"'
                    )
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }



        [HttpPut]
        public JsonResult Put(Testing testing)
        {
            string query = @"
                    update dbo.Testing set 
                    Name = '" + testing.Name + @"'
                    ,Grade = '" + testing.Grade + @"'
                    ,Date = '" + testing.Date + @"'
                    ,Subject = '" + testing.Subject   + @"'
                    ,NumberOfPases = '" + testing.NumberOfPases + @"'
                    ,[User] = '" + testing.User + @"'

                    where Id = " + testing.Id + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }



        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.Testing
                    where Id = " + id + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }



        [HttpGet]
        [Route("GetAllTestingName")]
        public JsonResult GetAllTestingName()
        {
            string query = @"
                    select Name from dbo.Testing
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


    }


}
