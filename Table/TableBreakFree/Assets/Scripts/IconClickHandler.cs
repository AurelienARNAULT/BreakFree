using UnityEngine;

public class IconClickHandler : MonoBehaviour
{
    private void OnMouseDown()
    {
        SocketManager.Instance.SendSocket("key send to pocket");
    }
}
