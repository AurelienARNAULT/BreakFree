using UnityEngine;
using UnityEngine.SceneManagement;

public class PlayerPrefsReset : MonoBehaviour
{
    void Start()
    {
        // Appel de DeleteAll pour r�initialiser les PlayerPrefs
        PlayerPrefs.DeleteAll();
        Debug.Log("pref suppr");

        SceneManager.LoadScene(1);
    }
}
