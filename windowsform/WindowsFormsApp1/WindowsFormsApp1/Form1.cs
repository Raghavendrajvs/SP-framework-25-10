using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    public partial class Form1 : Form
    {
        IList<string> strList = new List<string>();
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            label1.Text = "Select Folder :";
            label2.Text = "Selected Folders :";
        }

      
        private void folderBrowserDialog1_HelpRequest_1(object sender, EventArgs e)
        {
           
        }

        private void button1_Click(object sender, EventArgs e)
        {
            using (FolderBrowserDialog folderBrowserDialog1 = new FolderBrowserDialog())
            {
                if (folderBrowserDialog1.ShowDialog() == DialogResult.OK)
                {
                    textBox1.Text = folderBrowserDialog1.SelectedPath;
                }
            }
        }

        private void openFileDialog1_FileOk(object sender, CancelEventArgs e)
        {
           
        }

        private void button2_Click(object sender, EventArgs e)
        {
            if (openFileDialog1.ShowDialog() == System.Windows.Forms.DialogResult.OK)
            {
                System.IO.StreamReader sr = new
                   System.IO.StreamReader(openFileDialog1.FileName);
                MessageBox.Show(sr.ReadToEnd());
                sr.Close();
            }
        }

        private void button2_Click_1(object sender, EventArgs e)
        {
            string filepath = textBox1.Text;
            Boolean IfItemIsExists = false;
            foreach(string PresentFilePath in strList)
            {
                if(filepath.Equals(PresentFilePath))
                {
                    IfItemIsExists = true;
                }
            }
            if (IfItemIsExists)
            {
                strList.Remove(filepath);
                int ExistedFilePlace = filepath.LastIndexOf("\\");
                String ExistedfileName = filepath.Substring(ExistedFilePlace + 1);
                listBox1.Items.Remove(ExistedfileName);
            }
            strList.Add(filepath);
            int LastIndexOf = filepath.LastIndexOf("\\");
            String fileName = filepath.Substring(LastIndexOf+1);
            listBox1.Items.Add(fileName);
            textBox1.Text = "";
        }

        private void button3_Click(object sender, EventArgs e)
        {
           
            string filepath = listBox1.SelectedItem.ToString();
            listBox1.Items.Remove(filepath);
            String RemovingItem="";
            foreach (String file in strList)
            {
                int LastIndexOf = file.LastIndexOf("\\");
                String fileName = file.Substring(LastIndexOf + 1);
                if (fileName.Equals(filepath))
                {
                    RemovingItem = file;
                }
            }
            strList.Remove(RemovingItem);
            
        }

        private void button4_Click(object sender, EventArgs e)
        {

        }
    }
}
